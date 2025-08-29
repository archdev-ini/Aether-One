
import Airtable, {FieldSet, Record, Records} from 'airtable';

// Type definitions moved here to be accessible by other parts of the app
export type User = {
  airtableId?: string;
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
  VerificationToken?: string | null;
  VerificationTokenExpires?: Date;
  CreatedAt?: Date;
  ActivatedAt?: Date | null;
};

export type Event = {
  airtableId: string;
  code: string;
  title: string;
  date: string;
  type: 'Talk' | 'Workshop' | 'Challenge' | 'Meetup';
  focus:
    | 'Architecture'
    | 'AI in Design'
    | 'Web3'
    | 'Computational Design'
    | 'Sustainable Architecture'
    | 'General';
  description: string;
  image: string;
  aiHint: string;
  platform: string;
  location: string;
  longDescription: string;
  speakers: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
  }[];
  agenda:
    | {
        time: string;
        topic: string;
      }[]
    | null;
  whatToExpect?: string[];
  whyAttend?: {
    students: string;
    professionals: string;
  };
};

export type Resource = {
  id: string;
  title: string;
  category:
    | 'Architecture & Design'
    | 'Technology & Web3'
    | 'Community & Leadership'
    | 'Aether Insights';
  type: 'Article' | 'Video' | 'PDF' | 'Tool' | 'Course';
  author: string;
  tags: string[];
  link: string;
  access: 'Public' | 'Members-only';
  dateAdded: string;
  description: string;
};

export type UpdatePost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: 'Update' | 'Opportunity' | 'Event' | 'Release';
  link: string;
};

type RsvpPayload = {
  fldejTBGYZV2zwMaH: string[];
  fldkyFvyFq2p40Prz?: string[];
  fldIVjDRve03JrSf1: 'Registered';
};

type SupportRequestPayload = {
  fldd5M9nJbBlstpgd: string; // Name
  fldFqQLyaPQCoAnGv: string; // Email
  fldRvJloMXtxtXqj9: string; // Category / Subject
  fldADkwRbJOn90s1G: string; // Message
  fldBs87WBIVMWUuLK: 'Open'; // Status
};

type AboutContent = {
  story: string;
  vision: string;
};

type NewUserPayload = {
  FullName: string;
  Email: string;
  IsActivated: boolean;
  CityCountry: string;
  AgeRange: string;
  CurrentRole: string;
  MainInterest: string;
  PreferredCommunityPlatform: string;
  SocialHandle?: string;
  Goals?: string;
  VerificationToken?: string | null;
};

type UpdateUserPayload = {
    FullName?: string;
    CityCountry?: string;
    SocialHandle?: string;
    Goals?: string;
    IsActivated?: boolean;
}


if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  console.warn('Airtable API Key or Base ID is not set. Using mock data.');
}

const base =
  process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID
    ? new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(
        process.env.AIRTABLE_BASE_ID
      )
    : null;

async function fetchAllRecords<T extends FieldSet>(
  tableId: string
): Promise<Records<T>> {
  if (!base) return [];
  try {
    const table = base(tableId);
    const records = await table.select().all();
    return records;
  } catch (error) {
    console.error(`[Airtable] Error fetching from table ${tableId}:`, error);
    throw error;
  }
}

function mapRecordToUser(record: Record<FieldSet>): User {
  const fields = record.fields;
  const preferredPlatform = Array.isArray(fields.fldpL0ntu6jlFPZ8P)
    ? (fields.fldpL0ntu6jlFPZ8P as string[])[0]
    : (fields.fldpL0ntu6jlFPZ8P as string);

  return {
    airtableId: record.id,
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
    VerificationToken: fields.fldEhutDpQHkfxRqf as string,
    VerificationTokenExpires: new Date(),
    CreatedAt: new Date(fields.fldeAm50SwW5CMIZS as string),
    ActivatedAt: fields.fldZmHeRYwkkqrsOG === 'Active' ? new Date() : null,
  };
}

function mapRecordToEvent(record: Record<FieldSet>): Event {
  const fields = record.fields;
  let speakers: Event['speakers'] = [];
  if (fields.fld7qYoCXteCIAM32) {
    try {
      speakers = JSON.parse(fields.fld7qYoCXteCIAM32 as string);
    } catch (e) {
      console.error(
        'Failed to parse speakers for event ' + fields.fldmtn2xFhtijck4H,
        e
      );
    }
  }

  let agenda: Event['agenda'] = [];
  if (fields.Agenda) {
    try {
      agenda = JSON.parse(fields.Agenda as string);
    } catch (e) {
      console.error(
        'Failed to parse agenda for event ' + fields.fldmtn2xFhtijck4H,
        e
      );
    }
  }

  return {
    airtableId: record.id,
    code: fields.fldmtn2xFhtijck4H as string,
    title: fields.fld1w8i3kvk81KTN1 as string,
    date: fields.fldtOlaXw6TXiftBp as string,
    type: fields.fldrIhDKMTz05NbjW as Event['type'],
    focus: 'General',
    description:
      (fields.fldeUgXSaYspo7nj6 as string)?.substring(0, 150) + '...' || '',
    image: 'https://picsum.photos/800/600',
    aiHint: 'event placeholder',
    platform: 'Online',
    location: 'Global',
    longDescription: fields.fldeUgXSaYspo7nj6 as string,
    speakers,
    agenda,
  };
}

function mapRecordToResource(record: Record<FieldSet>): Resource {
  const fields = record.fields;
  let tags: string[] = [];
  if (typeof fields.fld9ygUQWViVWFYuG === 'string') {
    tags = (fields.fld9ygUQWViVWFYuG as string).split(',').map((tag) => tag.trim());
  } else if (Array.isArray(fields.fld9ygUQWViVWFYuG)) {
    tags = fields.fld9ygUQWViVWFYuG;
  }

  return {
    id: record.id,
    title: fields.fldBntPh6Rh1XRtL2 as string,
    category: fields.fldDyd1hqxfO3pkjA as Resource['category'],
    type: fields.fldlAzeoVlTMXDYXm as Resource['type'],
    author: fields.fld8bWUJOJc4oojGE as string,
    tags,
    link: fields.fldPelfxEz472Cd6w as string,
    access: fields.fld6eN4CWOZV57z0a as Resource['access'],
    dateAdded: fields.fldtPmgHB5pcuZunMC as string,
    description: fields.fldH5UYeRttsIEUpX as string,
  };
}

function mapRecordToUpdate(record: Record<FieldSet>): UpdatePost {
  const fields = record.fields;
  return {
    id: record.id,
    title: fields.fldIVueHd8hESvI52 as string,
    date: fields.fld5m3BQ4XYUfT461 as string,
    excerpt: fields.fldrsdvOZSQK0ap8e as string,
    category: fields.fldmVHdJeSB9ofu5H as UpdatePost['category'],
    link: fields.fld3thST17lQ2aaEY as string,
  };
}

export const db = {
  // USER FUNCTIONS
  async findUserByEmail(email: string): Promise<User | null> {
    if (!base) return null;
    try {
      const records = await base('tbl2Q9DdVCmKFKHnt')
        .select({
          filterByFormula: `{fldG6cwfmkjJnv9j7} = "${email}"`,
          maxRecords: 1,
        })
        .firstPage();

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
      const records = await base('tbl2Q9DdVCmKFKHnt')
        .select({
          filterByFormula: `{fldFXMNoNPjbk6ypb} = "${id}"`,
          maxRecords: 1,
        })
        .firstPage();

      if (records.length > 0) {
        return mapRecordToUser(records[0]);
      }
      return null;
    } catch (error) {
      console.error(`[Airtable] Error finding user by ID ${id}:`, error);
      return null;
    }
  },

  async createUser(userData: NewUserPayload): Promise<User | null> {
    if (!base) return null;
    try {
      const record = await base('tbl2Q9DdVCmKFKHnt').create([
        {
          fields: {
            fldqcL4FrRIYg40qb: userData.FullName,
            fldG6cwfmkjJnv9j7: userData.Email,
            fldUUjY4wwNBdkq8u: userData.CityCountry,
            fld0kF6qzsFTPaLur: userData.AgeRange,
            fldDgav4evACyC1A3: userData.CurrentRole,
            fldcxf5CUpXhmDHnJ: userData.MainInterest,
            fldpL0ntu6jlFPZ8P: [userData.PreferredCommunityPlatform],
            fld1xxrWwFQ3B3Azn: userData.SocialHandle,
            fldK7jPkvMehvA6XX: userData.Goals,
            fldZmHeRYwkkqrsOG: userData.IsActivated ? 'Active' : 'Pending',
            fldEhutDpQHkfxRqf: userData.VerificationToken,
          },
        },
      ]);
      return mapRecordToUser(record[0]);
    } catch (error) {
      console.error(`[Airtable] Error creating user ${userData.Email}:`, error);
      return null;
    }
  },

  async updateUser(recordId: string, userData: UpdateUserPayload): Promise<User | null> {
    if (!base) return null;
    try {
        const fieldsToUpdate: {[key: string]: any} = {};
        if (userData.FullName) fieldsToUpdate['fldqcL4FrRIYg40qb'] = userData.FullName;
        if (userData.CityCountry) fieldsToUpdate['fldUUjY4wwNBdkq8u'] = userData.CityCountry;
        if (userData.SocialHandle) fieldsToUpdate['fld1xxrWwFQ3B3Azn'] = userData.SocialHandle;
        if (userData.Goals) fieldsToUpdate['fldK7jPkvMehvA6XX'] = userData.Goals;
        if (userData.IsActivated) fieldsToUpdate['fldZmHeRYwkkqrsOG'] = 'Active';

        const updatedRecord = await base('tbl2Q9DdVCmKFKHnt').update(recordId, fieldsToUpdate);
        return mapRecordToUser(updatedRecord);
    } catch (error) {
        console.error(`[Airtable] Error updating user ${recordId}:`, error);
        return null;
    }
  },

  async verifyUserByToken(token: string): Promise<User | null> {
    if (!base) return null;
    try {
      const records = await base('tbl2Q9DdVCmKFKHnt')
        .select({
          filterByFormula: `{fldEhutDpQHkfxRqf} = "${token}"`,
          maxRecords: 1,
        })
        .firstPage();

      if (records.length === 0) {
        return null;
      }

      const userRecord = records[0];
      const updatedRecord = await base('tbl2Q9DdVCmKFKHnt').update(
        userRecord.id,
        {
          fldZmHeRYwkkqrsOG: 'Active',
          fldEhutDpQHkfxRqf: null,
        }
      );

      return mapRecordToUser(updatedRecord);
    } catch (error) {
      console.error(`[Airtable] Error verifying token:`, error);
      return null;
    }
  },

  async updateUserToken(
    email: string,
    token: string,
    expires: Date
  ): Promise<User | null> {
    if (!base) return null;
    const user = await this.findUserByEmail(email);
    if (!user || !user.airtableId) return null;

    try {
      const updatedRecord = await base('tbl2Q9DdVCmKFKHnt').update(
        user.airtableId,
        {
          fldEhutDpQHkfxRqf: token,
        }
      );
      return mapRecordToUser(updatedRecord);
    } catch (error) {
      console.error(`[Airtable] Error updating token for ${email}:`, error);
      return null;
    }
  },

  // RSVP / EVENT FUNCTIONS
  async createRsvp(
    rsvpData: Omit<RsvpPayload, 'fldIVjDRve03JrSf1'>
  ): Promise<void> {
    if (!base) throw new Error('Airtable not configured');
    try {
      const payload: RsvpPayload = {
        ...rsvpData,
        fldIVjDRve03JrSf1: 'Registered',
      };
      await base('tblzZ5tXPYQaavzEJ').create([{fields: payload}]);
    } catch (error) {
      console.error(`[Airtable] Error creating RSVP:`, error);
      throw error;
    }
  },

  async getRsvpCountForEvent(eventCode: string): Promise<number> {
    if (!base) return 0;
    try {
      const records = await base('tblzZ5tXPYQaavzEJ')
        .select({
          filterByFormula: `{fldfnpJ4aHxdweObc} = "${eventCode}"`,
        })
        .all();
      return records.length;
    } catch (error) {
      console.error(
        `[Airtable] Error getting RSVP count for event ${eventCode}:`,
        error
      );
      return 0;
    }
  },

  async getEvents(): Promise<Event[]> {
    if (!base) return [];
    const records = await fetchAllRecords<FieldSet>('tblDEVT8wrX6U35gk');
    return records.map(mapRecordToEvent);
  },

  async getEventByCode(code: string): Promise<Event | null> {
    if (!base) return null;
    try {
      const records = await base('tblDEVT8wrX6U35gk')
        .select({
          filterByFormula: `{fldmtn2xFhtijck4H} = "${code}"`,
          maxRecords: 1,
        })
        .firstPage();

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
    const records = await fetchAllRecords<FieldSet>('tblPE0SNXLuWanfIk');
    return records.map(mapRecordToResource);
  },

  // UPDATES FEED FUNCTIONS
  async getUpdates(): Promise<UpdatePost[]> {
    const records = await fetchAllRecords<FieldSet>('tblS2uYs8YwWEphLP');
    return records.map(mapRecordToUpdate);
  },

  // ABOUT PAGE FUNCTIONS
  async getAboutPageContent(): Promise<AboutContent | null> {
    if (!base)
      return {
        story: 'Our story is just beginning...',
        vision: 'Our vision is to build a vibrant community.',
      }; // Provide fallback content
    try {
      const records = await base('tblrtY650XWDhY4Hm')
        .select({maxRecords: 1})
        .firstPage();
      if (records.length > 0) {
        const fields = records[0].fields;
        return {
          story: (fields.fld8tkPZa5JGDB0k8 as string) || '',
          vision: (fields.fldj8CE7Q0oieunBS as string) || '',
        };
      }
      return null;
    } catch (error) {
      console.error(`[Airtable] Error fetching About page content:`, error);
      return null; // Return null on error to be handled by the page
    }
  },

  // SUPPORT REQUEST FUNCTIONS
  async createSupportRequest(
    requestData: Omit<SupportRequestPayload, 'fldBs87WBIVMWUuLK'>
  ): Promise<void> {
    if (!base) throw new Error('Airtable not configured');
    try {
      const payload: SupportRequestPayload = {
        ...requestData,
        fldBs87WBIVMWUuLK: 'Open',
      };
      await base('tblvfz5CYg6MNgeMb').create([{fields: payload}]);
    } catch (error) {
      console.error(`[Airtable] Error creating support request:`, error);
      throw error;
    }
  },
};
