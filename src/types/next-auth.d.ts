
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      aetherId?: string;
      isProfileComplete?: boolean;
    } & DefaultSession["user"];
  }
}
