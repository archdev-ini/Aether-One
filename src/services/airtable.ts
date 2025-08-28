
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
    return {
        AetherID: fields['Aether ID'] as string,
        FullName: fields['Full Name'] as string,
        Email: fields['Email'] as string,
        CityCountry: fields['City + Country'] as string,
        AgeRange: fields['Age Range'] as string,
        CurrentRole: fields['Current Role'] as string,
        MainInterest: fields['Main Interest'] as string,
        PreferredCommunityPlatform: fields['Preferred Platform'] as string,
        SocialHandle: fields['Social Handle'] as string,
        Goals: fields['Goals'] as string,
        IsActivated: fields['Is Activated'] as boolean || false,
        VerificationToken: fields['Verification Token'] as string,
        VerificationTokenExpires: new Date(fields['Verification Token Expires'] as string),
        CreatedAt: new Date(fields['Created At'] as string),
        ActivatedAt: fields['Activated At'] ? new Date(fields['Activated At'] as string) : null,
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
            const records = await base('Users').select({
                filterByFormula: `{Email} = "${email}"`,
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
            const records = await base('Users').select({
                filterByFormula: `{Aether ID} = "${id}"`,
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

    async createUser(userData: Omit<User, 'CreatedAt' | 'ActivatedAt' | 'AetherID'> & { AetherID: string }): Promise<User | null> {
         if (!base) return null;
        try {
            const record = await base('Users').create([
                {
                    fields: {
                        'Aether ID': userData.AetherID,
                        'Full Name': userData.FullName,
                        'Email': userData.Email,
                        'City + Country': userData.CityCountry,
                        'Age Range': userData.AgeRange,
                        'Current Role': userData.CurrentRole,
                        'Main Interest': userData.MainInterest,
                        'Preferred Platform': userData.PreferredCommunityPlatform,
                        'Social Handle': userData.SocialHandle,
                        'Goals': userData.Goals,
                        'Is Activated': userData.IsActivated,
                        'Verification Token': userData.VerificationToken,
                        'Verification Token Expires': userData.VerificationTokenExpires.toISOString(),
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
            const records = await base('Users').select({
                filterByFormula: `AND({Verification Token} = "${token}", IS_AFTER({Verification Token Expires}, NOW()))`,
                maxRecords: 1
            }).firstPage();

            if (records.length === 0) {
                return null;
            }

            const userRecord = records[0];
            const updatedRecord = await base('Users').update(userRecord.id, {
                'Is Activated': true,
                'ActivatedAt': new Date().toISOString(),
                'Verification Token': null,
                'Verification Token Expires': null,
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
            const userRecord = (await base('Users').select({filterByFormula: `{Email} = "${email}"`}).firstPage())[0];
            const updatedRecord = await base('Users').update(userRecord.id, {
                'Verification Token': token,
                'Verification Token Expires': expires.toISOString(),
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

    