
"use server";

import { z } from "zod";
import { db } from "@/services/airtable";

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(10),
});

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
        console.error("Error creating support request:", error);
        if (error instanceof z.ZodError) {
            return { success: false, message: "Invalid form data." };
        }
        return { success: false, message: "An unexpected error occurred." };
    }
}
