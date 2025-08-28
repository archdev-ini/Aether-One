
"use server";

import { z } from "zod";

export const rsvpFormSchema = z.object({
  eventCode: z.string(),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  aetherId: z.string().optional(),
  cityCountry: z.string().optional(),
  preferredPlatform: z.string({ required_error: "Please select your preferred platform." }),
  interest: z.string().optional(),
});

export async function submitRsvp(values: z.infer<typeof rsvpFormSchema>) {
    console.log("====================================");
    console.log(" MOCK RSVP SUBMISSION TO AIRTABLE   ");
    console.log("====================================");
    
    // In a real application, you would use the Airtable API here
    // to create a new record in your 'Events_RSVP' table.
    const rsvpRecord = {
        'Event Code': values.eventCode,
        'Full Name': values.fullName,
        'Email': values.email,
        'Aether ID': values.aetherId,
        'City + Country': values.cityCountry,
        'Platform': values.preferredPlatform,
        'Interest Notes': values.interest,
        'RSVP Timestamp': new Date().toISOString(),
    };

    console.log("Record to be saved to 'Events_RSVP' table:");
    console.log(rsvpRecord);
    console.log("====================================");
    
    // Example of what the Airtable API call might look like:
    // await airtable.base('YOUR_BASE_ID').table('Events_RSVP').create([
    //   { fields: rsvpRecord }
    // ]);

    return { success: true, message: "Your spot has been reserved!" };
}
