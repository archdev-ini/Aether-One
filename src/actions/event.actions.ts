
"use server";

import { z } from "zod";

export const rsvpFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  aetherId: z.string().optional(),
  cityCountry: z.string().optional(),
  preferredPlatform: z.string({ required_error: "Please select your preferred platform." }),
  interest: z.string().optional(),
});

export async function submitRsvp(values: z.infer<typeof rsvpFormSchema>) {
    console.log("====================================");
    console.log(" MOCK RSVP SUBMISSION               ");
    console.log("====================================");
    console.log("Received RSVP Form Data:");
    console.log(values);
    console.log("====================================");
    console.log("In a real application, this data would be saved to a database (e.g., a new 'RSVPs' table in Airtable) and linked to the member and event records.");
    console.log("====================================");
    
    // Here you would add your database logic, e.g.:
    // await db.createRsvp(values);

    return { success: true, message: "Your spot has been reserved!" };
}
