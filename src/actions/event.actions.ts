
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

function handleAirtableError(error: any) {
    console.error('[Airtable Action Error]', error);
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
    return { success: false, message: "An unexpected error occurred while reserving your spot." };
}

export async function submitRsvp(values: RsvpFormValues) {
    try {
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
            'fldejTBGYZV2zwMaH': [event.airtableId], // Link to the event record
            'fldkyFvyFq2p40Prz': user && user.airtableId ? [user.airtableId] : undefined, // Link to user if they exist
        };
        
        await db.createRsvp(rsvpRecord);

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
    } catch (error) {
        return handleAirtableError(error);
    }
}
