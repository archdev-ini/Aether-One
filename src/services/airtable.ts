import Airtable, { FieldSet, Records } from 'airtable';
import type { Event } from '@/app/events/data';
import type { Resource } from '@/app/knowledge/data';
import type { UpdatePost } from '@/app/updates/data';

// This is a mock database service.
// In a real application, you would replace this with a connection to a real database like Airtable, Firebase, or PostgreSQL.
type User = {
    AetherID: string;
    FullName: string;
    Email: string;
    CityCountry: string;
    AgeRange: string;
    CurrentRole: string;
    MainInterest: string;
    PreferredCommunityPlatform: string;
    SocialHandle?: string;
    Goals?: string;
    IsActivated: boolean;
    VerificationToken: string;
    VerificationTokenExpires: Date;
    CreatedAt?: Date;
    ActivatedAt?: Date | null;
};

type Rsvp = {
    'Event Code': string,
    'Full Name': string,
    'Email': string,
    'Aether ID'?: string,
    'City + Country'?: string,
    'Platform': string,
    'Interest Notes'?: string,
    'RSVP Timestamp': string,
}

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID as string);

// --- HELPER FUNCTIONS ---
// These helpers will handle fetching all pages of records and mapping fields.
// This reduces boilerplate code in the main functions.

async function fetchAllRecords<T extends FieldSet>(tableId: string): Promise<Records<T>> {
    try {
        const table = base(tableId);
        const records = await table.select().all();
        console.log(`[Airtable] Fetched ${records.length} records from table ${tableId}`);
        return records;
    } catch (error) {
        console.error(`[Airtable] Error fetching from table ${tableId}:`, error);
        return [];
    }
}

function mapRecordToUser(record: any): User {
    const fields = record.fields;
    return {
        AetherID: fields['Aether ID'],
        FullName: fields['Full Name'],
        Email: fields['Email'],
        CityCountry: fields['City + Country'],
        AgeRange: fields['Age Range'],
        CurrentRole: fields['Current Role'],
        MainInterest: fields['Main Interest'],
        PreferredCommunityPlatform: fields['Preferred Platform'],
        SocialHandle: fields['Social Handle'],
        Goals: fields['Goals'],
        IsActivated: fields['Is Activated'] || false,
        VerificationToken: fields['Verification Token'],
        VerificationTokenExpires: new Date(fields['Verification Token Expires']),
        CreatedAt: new Date(fields['Created At']),
        ActivatedAt: fields['Activated At'] ? new Date(fields['Activated At']) : null,
    };
}


// --- DATABASE FUNCTIONS ---
export const db = {
    // USER FUNCTIONS
    async findUserByEmail(email: string): Promise<User | null> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Searching for user with email: ${email}`);
        return null;
    },

    async findUserById(id: string): Promise<User | null> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Searching for user with ID: ${id}`);
        return null;
    },

    async createUser(userData: Omit<User, 'CreatedAt' | 'ActivatedAt'>): Promise<User> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Creating/Updating user: ${userData.Email}`);
        return { ...userData, CreatedAt: new Date(), ActivatedAt: null };
    },

    async verifyUserByToken(token: string): Promise<User | null> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Verifying token: ${token}`);
        return null;
    },

    async updateUserToken(email: string, token: string, expires: Date): Promise<User | null> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Updating token for: ${email}`);
        return null;
    },

    // RSVP / EVENT FUNCTIONS
    async createRsvp(rsvpData: Rsvp): Promise<Rsvp> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Creating RSVP for: ${rsvpData['Event Code']}`);
        return rsvpData;
    },

    async getRsvpCountForEvent(eventCode: string): Promise<number> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Getting RSVP count for: ${eventCode}`);
        return 0;
    },

    async getEvents(): Promise<Event[]> {
        // TODO: Replace with Airtable API call
        console.log("[Airtable MOCK] Fetching all events.");
        return [];
    },

    async getEventByCode(code: string): Promise<Event | null> {
        // TODO: Replace with Airtable API call
        console.log(`[Airtable MOCK] Fetching event: ${code}`);
        return null;
    },

    // KNOWLEDGE HUB FUNCTIONS
    async getResources(): Promise<Resource[]> {
         // TODO: Replace with Airtable API call
        console.log("[Airtable MOCK] Fetching all knowledge hub resources.");
        return [];
    },

    // UPDATES FEED FUNCTIONS
    async getUpdates(): Promise<UpdatePost[]> {
        // TODO: Replace with Airtable API call
        console.log("[Airtable MOCK] Fetching all update posts.");
        return [];
    }
};
