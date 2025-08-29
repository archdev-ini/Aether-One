
'use server';

import {z} from 'zod';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

import {db} from '@/services/airtable';
import {sendVerificationEmail, sendLoginEmail} from '@/services/email';
import {revalidatePath} from 'next/cache';

const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  location: z.string().min(2),
  ageRange: z.string(),
  currentRole: z.string(),
  mainInterest: z.string(),
  preferredPlatform: z.string(),
  socialHandle: z.string().optional(),
  goals: z.string().optional(),
});

const profileUpdateSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2, {message: 'Full name is required.'}),
  city: z.string().min(2, {message: 'City is required.'}),
  country: z.string().min(2, {message: 'Country is required.'}),
  phone: z.string().optional(),
  interests: z.array(z.string()).min(1, {message: 'Select at least one interest.'}),
  consent: z.literal(true, {
    errorMap: () => ({message: 'You must agree to the community rules.'}),
  }),
});


export async function createUser(values: z.infer<typeof signUpSchema>) {
  try {
    const validatedData = signUpSchema.parse(values);

    const existingUser = await db.findUserByEmail(validatedData.email);

    if (existingUser && existingUser.IsActivated) {
      return {
        success: false,
        message: 'An account with this email already exists and is verified.',
      };
    }

    const verificationToken = crypto.randomUUID();
    const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    const newUser = await db.createUser({
      FullName: validatedData.fullName,
      Email: validatedData.email,
      CityCountry: validatedData.location,
      AgeRange: validatedData.ageRange,
      CurrentRole: validatedData.currentRole,
      MainInterest: validatedData.mainInterest,
      PreferredCommunityPlatform: validatedData.preferredPlatform,
      SocialHandle: validatedData.socialHandle,
      Goals: validatedData.goals,
      VerificationToken: verificationToken,
      IsActivated: false,
    });

    if (!newUser) {
      return {
        success: false,
        message: 'Could not create account. Please try again.',
      };
    }

    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${verificationToken}`;

    await sendVerificationEmail({
      to: validatedData.email,
      name: validatedData.fullName,
      aetherId: newUser.AetherID,
      verificationLink,
    });

    return {success: true};
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof z.ZodError) {
      return {success: false, message: 'Invalid form data.'};
    }
    return {success: false, message: 'An unexpected error occurred.'};
  }
}

export async function updateUserProfile(values: z.infer<typeof profileUpdateSchema>) {
    try {
        const validatedData = profileUpdateSchema.parse(values);
        const user = await db.findUserByEmail(validatedData.email);

        if (!user || !user.airtableId) {
            return { success: false, message: "User not found." };
        }

        await db.updateUser(user.airtableId, {
            FullName: validatedData.fullName,
            CityCountry: `${validatedData.city}, ${validatedData.country}`,
            // Assuming phone and interests map to fields. We will use existing ones for now.
            // SocialHandle will store the phone number for this example.
            SocialHandle: validatedData.phone,
            // Goals will store interests.
            Goals: validatedData.interests.join(', '),
            IsActivated: true, // Mark profile as complete
        });

        revalidatePath('/profile');

        return { success: true };

    } catch (error) {
        console.error("Error updating user profile:", error);
        if (error instanceof z.ZodError) {
            return { success: false, message: "Invalid form data." };
        }
        return { success: false, message: "An unexpected error occurred." };
    }
}


export async function verifyTokenAndLogin(token: string) {
  if (!token) {
    return {success: false, message: 'Verification token is missing.'};
  }

  try {
    const user = await db.verifyUserByToken(token);

    if (!user) {
      return {
        success: false,
        message:
          'Invalid or expired verification link. Please try signing up again.',
      };
    }

    // Set cookies for the session
    cookies().set('aether_user_id', user.AetherID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
    cookies().set('aether_user_name', user.FullName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });

    // The redirect is handled on the page to allow for callbackUrl
    return {success: true};
  } catch (error) {
    console.error('Verification Error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred during verification.',
    };
  }
}

export async function sendLoginLink(email: string) {
  try {
    const user = await db.findUserByEmail(email);

    if (!user || !user.IsActivated) {
      return {
        success: false,
        message: 'No active account found for this email. Please sign up first.',
      };
    }

    const loginToken = crypto.randomUUID();
    const loginTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    await db.updateUserToken(email, loginToken, loginTokenExpires);

    const loginLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${loginToken}`;

    await sendLoginEmail({
      to: user.Email,
      name: user.FullName,
      loginLink,
    });

    return {
      success: true,
      message: `A magic link has been sent to ${email}.`,
    };
  } catch (error) {
    console.error('Error sending login link:', error);
    return {success: false, message: 'An unexpected error occurred.'};
  }
}
