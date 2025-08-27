
"use server";

import { z } from "zod";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { db } from "@/services/airtable";
import { sendVerificationEmail } from "@/services/email";

const formSchema = z.object({
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

export async function createUser(values: z.infer<typeof formSchema>) {
    try {
        const validatedData = formSchema.parse(values);

        const existingUser = await db.findUserByEmail(validatedData.email);

        if (existingUser && existingUser.verified) {
            return { success: false, message: "An account with this email already exists and is verified." };
        }

        const aetherId = `AX-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
        const verificationToken = crypto.randomUUID();
        const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

        await db.createUser({
            fullName: validatedData.fullName,
            email: validatedData.email,
            cityCountry: validatedData.location,
            ageRange: validatedData.ageRange,
            currentRole: validatedData.currentRole,
            mainInterest: validatedData.mainInterest,
            preferredCommunityPlatform: validatedData.preferredPlatform,
            socialHandle: validatedData.socialHandle,
            goals: validatedData.goals,
            aetherId,
            verificationToken,
            verificationTokenExpires,
            verified: false,
        });

        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${verificationToken}`;

        await sendVerificationEmail({
            to: validatedData.email,
            name: validatedData.fullName,
            aetherId,
            verificationLink,
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating user:", error);
        if (error instanceof z.ZodError) {
            return { success: false, message: "Invalid form data." };
        }
        return { success: false, message: "An unexpected error occurred." };
    }
}


export async function verifyTokenAndLogin(token: string) {
    if (!token) {
        return { success: false, message: 'Verification token is missing.' };
    }
    
    try {
        const user = await db.verifyUserByToken(token);

        if (!user) {
            return { success: false, message: 'Invalid or expired verification link. Please try signing up again.' };
        }

        // Set cookies for the session
        cookies().set('aether_user_id', user.aetherId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });
        cookies().set('aether_user_name', user.fullName, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });

    } catch (error) {
        console.error('Verification Error:', error);
        return { success: false, message: 'An unexpected error occurred during verification.' };
    }

    // Redirect to profile page after successful verification
    redirect('/profile');
}
