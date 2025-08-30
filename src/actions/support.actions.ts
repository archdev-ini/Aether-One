
"use server";

import { z } from "zod";
import { db } from "@/services/airtable";

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(10),
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
    return {success: false, message: 'An unexpected error occurred.'};
}


export async function submitSupportRequest(values: z.infer<typeof contactFormSchema>) {
    try {
        const validatedData = contactFormSchema.parse(values);

        await db.createSupportRequest({
            'fldd5M9nJbBlstpgd': validatedData.name,
            'fldFqQLyaPQCoAnGv': validatedData.email,
            'fldRvJloMXtxtXqj9': validatedData.subject,
            'fldADkwRbJOn90s1G': validatedData.message,
        });

        return { success: true };
    } catch (error) {
        return handleAirtableError(error);
    }
}
