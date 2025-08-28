
import Airtable, { FieldSet, Record, Records } from 'airtable';
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

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.warn("Airtable API Key or Base ID is not set. Using mock data.");
}

// Initialize Airtable
const base = process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID 
    ? new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
    : null;

// --- HELPER FUNCTIONS ---
// These helpers will handle fetching all pages of records and mapping fields.
// This reduces boilerplate code in the main functions.

async function fetchAllRecords<T extends FieldSet>(tableId: string): Promise<Records<T>> {
    if (!base) return [];
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

function mapRecordToUser(record: Record<FieldSet>): User {
    const fields = record.fields;
    // The `Preferred Community Platform` is a multi-select, so we take the first one for now.
    // This could be updated in the future to support multiple platforms.
    const preferredPlatform = Array.isArray(fields.fldpL0ntu6jlFPZ8P) 
        ? (fields.fldpL0ntu6jlFPZ8P as string[])[0] 
        : fields.fldpL0ntu6jlFPZ8P as string;

    return {
        AetherID: fields.fldFXMNoNPjbk6ypb as string,
        FullName: fields.fldqcL4FrRIYg40qb as string,
        Email: fields.fldG6cwfmkjJnv9j7 as string,
        CityCountry: fields.fldUUjY4wwNBdkq8u as string,
        AgeRange: fields.fld0kF6qzsFTPaLur as string,
        CurrentRole: fields.fldDgav4evACyC1A3 as string,
        MainInterest: fields.fldcxf5CUpXhmDHnJ as string,
        PreferredCommunityPlatform: preferredPlatform,
        SocialHandle: fields.fld1xxrWwFQ3B3Azn as string,
        Goals: fields.fldK7jPkvMehvA6XX as string,
        IsActivated: fields.fldZmHeRYwkkqrsOG === 'Active',
        VerificationToken: fields.fldEhutDpQHkfxRqf as string, // Using Auth Link as the token field
        VerificationTokenExpires: new Date(), // This needs a dedicated field in Airtable
        CreatedAt: new Date(fields.fldeAm50SwW5CMIZS as string),
        ActivatedAt: fields.fldZmHeRYwkkqrsOG === 'Active' ? new Date() : null, // This needs a dedicated field
    };
}


function mapRecordToEvent(record: Record<FieldSet>): Event {
    const fields = record.fields;
    let speakers: Event['speakers'] = [];
    if (fields.Speakers) {
        try {
            speakers = JSON.parse(fields.Speakers as string);
        } catch(e) {
            console.error("Failed to parse speakers for event " + fields.Code, e)
        }
    }

    let agenda: Event['agenda'] = [];
     if (fields.Agenda) {
        try {
            agenda = JSON.parse(fields.Agenda as string);
        } catch(e) {
            console.error("Failed to parse agenda for event " + fields.Code, e)
        }
    }


    return {
        code: fields.Code as string,
        title: fields.Title as string,
        date: fields.Date as string,
        type: fields.Type as Event['type'],
        focus: fields.Focus as Event['focus'],
        description: fields.Description as string,
        image: fields.Image as string,
        aiHint: fields.AI_Hint as string,
        platform: fields.Platform as string,
        location: fields.Location as string,
        longDescription: fields['Long Description'] as string,
        speakers,
        agenda,
    };
}

function mapRecordToResource(record: Record<FieldSet>): Resource {
    const fields = record.fields;
    let tags: string[] = [];
    if (typeof fields.Tags === 'string') {
        tags = (fields.Tags as string).split(',').map(tag => tag.trim());
    } else if (Array.isArray(fields.Tags)) {
        tags = fields.Tags;
    }

    return {
        id: record.id,
        title: fields.Title as string,
        category: fields.Category as Resource['category'],
        type: fields.Type as Resource['type'],
        author: fields.Author as string,
        tags,
        link: fields.Link as string,
        access: fields.Access as Resource['access'],
        dateAdded: fields['Date Added'] as string,
        description: fields.Description as string,
    };
}

function mapRecordToUpdate(record: Record<FieldSet>): UpdatePost {
    const fields = record.fields;
    return {
        id: record.id,
        title: fields.Title as string,
        date: fields.Date as string,
        excerpt: fields.Excerpt as string,
        category: fields.Category as UpdatePost['category'],
        link: fields.Link as string,
    };
}


// --- DATABASE FUNCTIONS ---
export const db = {
    // USER FUNCTIONS
    async findUserByEmail(email: string): Promise<User | null> {
        if (!base) return null;
        try {
            const records = await base('tbl2Q9DdVCmKFKHnt').select({
                filterByFormula: `{fldG6cwfmkjJnv9j7} = "${email}"`,
                maxRecords: 1
            }).firstPage();

            if (records.length > 0) {
                return mapRecordToUser(records[0]);
            }
            return null;
        } catch (error) {
            console.error(`[Airtable] Error finding user by email ${email}:`, error);
            return null;
        }
    },

    async findUserById(id: string): Promise<User | null> {
         if (!base) return null;
        try {
            const records = await base('tbl2Q9DdVCmKFKHnt').select({
                filterByFormula: `{fldFXMNoNPjbk6ypb} = "${id}"`,
                maxRecords: 1
            }).firstPage();

            if (records.length > 0) {
                return mapRecordToUser(records[0]);
            }
            return null;
        } catch (error) {
            console.error(`[Airtable] Error finding user by ID ${id}:`, error);
            return null;
        }
    },

    async createUser(userData: Omit<User, 'CreatedAt' | 'ActivatedAt' | 'AetherID'>): Promise<User | null> {
         if (!base) return null;
        try {
            const record = await base('tbl2Q9DdVCmKFKHnt').create([
                {
                    fields: {
                        'fldqcL4FrRIYg40qb': userData.FullName,
                        'fldG6cwfmkjJnv9j7': userData.Email,
                        'fldUUjY4wwNBdkq8u': userData.CityCountry,
                        'fld0kF6qzsFTPaLur': userData.AgeRange,
                        'fldDgav4evACyC1A3': userData.CurrentRole,
                        'fldcxf5CUpXhmDHnJ': userData.MainInterest,
                        'fldpL0ntu6jlFPZ8P': [userData.PreferredCommunityPlatform],
                        'fld1xxrWwFQ3B3Azn': userData.SocialHandle,
                        'fldK7jPkvMehvA6XX': userData.Goals,
                        'fldZmHeRYwkkqrsOG': 'Pending',
                        // NOTE: You will need to add fields in Airtable for token and expiry.
                        // For now, we are using Auth Link, but it's not ideal for expiry.
                        'fldEhutDpQHkfxRqf': userData.VerificationToken
                    }
                }
            ]);
            return mapRecordToUser(record[0]);
        } catch (error) {
            console.error(`[Airtable] Error creating user ${userData.Email}:`, error);
            return null;
        }
    },

   async verifyUserByToken(token: string): Promise<User | null> {
        if (!base) return null;
        try {
             // NOTE: This logic needs to be adapted. Airtable doesn't support token expiry checks in formulas easily.
             // This lookup should be done against a temporary token field.
            const records = await base('tbl2Q9DdVCmKFKHnt').select({
                filterByFormula: `{fldEhutDpQHkfxRqf} = "${token}"`,
                maxRecords: 1
            }).firstPage();

            if (records.length === 0) {
                return null;
            }

            const userRecord = records[0];
            const updatedRecord = await base('tbl2Q9DdVCmKFKHnt').update(userRecord.id, {
                'fldZmHeRYwkkqrsOG': 'Active',
                'fldEhutDpQHkfxRqf': null, // Clear the token
            });

            return mapRecordToUser(updatedRecord);
        } catch (error) {
            console.error(`[Airtable] Error verifying token:`, error);
            return null;
        }
    },

    async updateUserToken(email: string, token: string, expires: Date): Promise<User | null> {
        if (!base) return null;
        const user = await this.findUserByEmail(email);
        if (!user) return null;

        try {
            const userRecord = (await base('tbl2Q9DdVCmKFKHnt').select({filterByFormula: `{fldG6cwfmkjJnv9j7} = "${email}"`}).firstPage())[0];
            const updatedRecord = await base('tbl2Q9DdVCmKFKHnt').update(userRecord.id, {
                 'fldEhutDpQHkfxRqf': token
            });
            return mapRecordToUser(updatedRecord);
        } catch (error) {
            console.error(`[Airtable] Error updating token for ${email}:`, error);
            return null;
        }
    },

    // RSVP / EVENT FUNCTIONS
    async createRsvp(rsvpData: Rsvp): Promise<Rsvp> {
        if (!base) throw new Error("Airtable not configured");
        try {
            await base('Events_RSVP').create([{ fields: rsvpData }]);
            return rsvpData;
        } catch (error) {
             console.error(`[Airtable] Error creating RSVP for event ${rsvpData['Event Code']}:`, error);
             throw error;
        }
    },

    async getRsvpCountForEvent(eventCode: string): Promise<number> {
        if (!base) return 0;
        try {
            const records = await fetchAllRecords<{ 'Event Code': string }>('Events_RSVP');
            const filtered = records.filter(r => r.fields['Event Code'] === eventCode);
            return filtered.length;
        } catch (error) {
            console.error(`[Airtable] Error getting RSVP count for event ${eventCode}:`, error);
            return 0;
        }
    },

    async getEvents(): Promise<Event[]> {
        if (!base) return [];
        const records = await fetchAllRecords<FieldSet>('Events');
        return records.map(mapRecordToEvent);
    },

    async getEventByCode(code: string): Promise<Event | null> {
        if (!base) return null;
        try {
            const records = await base('Events').select({
                filterByFormula: `{Code} = "${code}"`,
                maxRecords: 1
            }).firstPage();

            if (records.length > 0) {
                return mapRecordToEvent(records[0]);
            }
            return null;
        } catch (error) {
            console.error(`[Airtable] Error fetching event ${code}:`, error);
            return null;
        }
    },

    // KNOWLEDGE HUB FUNCTIONS
    async getResources(): Promise<Resource[]> {
        if (!base) return [];
        const records = await fetchAllRecords<FieldSet>('KnowledgeHub');
        return records.map(mapRecordToResource);
    },

    // UPDATES FEED FUNCTIONS
    async getUpdates(): Promise<UpdatePost[]> {
        if (!base) return [];
        const records = await fetchAllRecords<FieldSet>('Updates');
        return records.map(mapRecordToUpdate);
    }
};
