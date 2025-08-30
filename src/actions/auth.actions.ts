
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
  phone: z.string().optional(),
  professionalLevel: z.string(),
  interestAreas: z.array(z.string()).min(1),
  socialHandle: z.string().optional(),
  goals: z.string().optional(),
  consent: z.literal(true),
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

function handleAirtableError(error: any) {
    console.error('[Airtable Action Error]', error);
    if (error instanceof z.ZodError) {
      return {success: false, message: 'Invalid form data.'};
    }
    // Check if it's an Airtable API error
    if (error.statusCode && error.message) {
        switch (error.statusCode) {
            case 401:
            case 403:
                return { success: false, message: "Authentication failed. Please check your Airtable API key and base permissions." };
            case 404:
                return { success: false, message: "The requested resource was not found. Please check your Airtable base/table IDs." };
            case 422:
                return { success: false, message: `Invalid request data: ${error.message}` };
            default:
                return { success: false, message: `Airtable API Error (${error.statusCode}): ${error.message}` };
        }
    }
    return {success: false, message: error.message || 'An unexpected error occurred.'};
}


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

    const newUser = await db.createUser({
      FullName: validatedData.fullName,
      Email: validatedData.email,
      CityCountry: validatedData.location,
      Phone: validatedData.phone,
      ProfessionalLevel: validatedData.professionalLevel,
      InterestAreas: validatedData.interestAreas.join(', '),
      SocialHandle: validatedData.socialHandle,
      Goals: validatedData.goals,
      IsActivated: false,
      VerificationToken: verificationToken,
    });

    if (!newUser || !newUser.AetherID) {
      return {
        success: false,
        message: 'Could not create account. Please try again.',
      };
    }
    
    await sendVerificationEmail({
        to: validatedData.email,
        name: validatedData.fullName,
        aetherId: newUser.AetherID,
        verificationToken: verificationToken,
    });

    return {success: true};
  } catch (error: any) {
    return handleAirtableError(error);
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
            Phone: validatedData.phone,
            InterestAreas: validatedData.interests.join(', '),
            IsActivated: true, 
        });

        revalidatePath('/profile');

        return { success: true };

    } catch (error) {
        return handleAirtableError(error);
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
    return {success: true, isProfileComplete: user.IsActivated };
  } catch (error) {
    return handleAirtableError(error);
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

    await db.updateUserToken(email, loginToken);

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
    return handleAirtableError(error);
  }
}

export async function getUserForProfile() {
    try {
        const userId = cookies().get('aether_user_id')?.value;

        if (!userId) {
            return { success: false, message: "User not authenticated." };
        }

        const user = await db.findUserById(userId);

        if (!user) {
            return { success: false, message: "User not found." };
        }
        
        // Return a serializable user object
        return { success: true, user: JSON.parse(JSON.stringify(user)) };

    } catch (error) {
        return handleAirtableError(error);
    }
}
