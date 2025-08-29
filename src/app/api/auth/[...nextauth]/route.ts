
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/services/airtable";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user: authUser, account, profile }) {
      if (!authUser.email) {
        console.error("Auth user has no email, cannot sign in.");
        return false;
      }

      try {
        let airtableUser = await db.findUserByEmail(authUser.email);

        if (!airtableUser) {
          // If user doesn't exist, create a new one with basic info
          // The rest of the profile will be filled out on the /join page
          airtableUser = await db.createUser({
            Email: authUser.email,
            FullName: authUser.name || "New User",
            IsActivated: false, // Profile is not complete
            // Set other fields to default/empty values
            CityCountry: '',
            AgeRange: '',
            CurrentRole: '',
            MainInterest: '',
            PreferredCommunityPlatform: 'Discord', // Default value
          });
        }
        
        if (!airtableUser) {
            console.error("Failed to find or create Airtable user for " + authUser.email);
            return false; // Prevent sign-in if user creation fails
        }

        return true; // Continue the sign-in process
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false; // Prevent sign-in on error
      }
    },
    async jwt({ token, user: authUser }) {
      // This callback is called after signIn
      if (authUser?.email) {
        const airtableUser = await db.findUserByEmail(authUser.email);
        if (airtableUser) {
          token.aetherId = airtableUser.AetherID;
          token.isProfileComplete = airtableUser.IsActivated;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Pass info from the JWT to the session object
      if (session.user) {
        session.user.aetherId = token.aetherId as string;
        session.user.isProfileComplete = token.isProfileComplete as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    // newUser: '/join' // We will handle this redirect logic manually
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
