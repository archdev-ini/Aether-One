
"use server";

import { z } from "zod";
import { db } from "@/services/airtable";
import { sendRsvpConfirmationEmail } from "@/services/email";

// This is defined in RsvpDialog.tsx now to avoid the "use server" export error.
type RsvpFormValues = {
  eventCode: string;
  fullName: string;
  email: string;
  aetherId?: string;
  interest?: string;
};

export async function submitRsvp(values: RsvpFormValues) {
    console.log("====================================");
    console.log("   RSVP SUBMISSION TO AIRTABLE      ");
    console.log("====================================");
    
    const event = await db.getEventByCode(values.eventCode);
    if (!event || !event.airtableId) {
        return { success: false, message: "This event could not be found." };
    }

    let user;
    if (values.aetherId) {
        user = await db.findUserById(values.aetherId);
    }

    // Even if there's no logged-in user, we might find an existing user by email
    if (!user) {
        user = await db.findUserByEmail(values.email);
    }
    
    const rsvpRecord = {
        'Event': [event.airtableId], // Link to the event record
        'User': user && user.airtableId ? [user.airtableId] : undefined, // Link to user if they exist
        'Notes': values.interest,
        // The form now only collects interest, name and email are derived or entered.
        // Status and Registration Date are handled by Airtable.
    };
    
    console.log("Record to be saved to 'Event Registrations' table:");
    console.log(rsvpRecord);
    
    await db.createRsvp(rsvpRecord);

    console.log("====================================");


    if (event) {
        await sendRsvpConfirmationEmail({
            to: values.email,
            name: values.fullName,
            eventName: event.title,
            eventDate: new Date(event.date),
            eventPlatform: event.platform,
            eventLocation: event.location,
        });
    }

    return { success: true, message: "Your spot has been reserved!" };
}
