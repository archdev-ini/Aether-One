
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

// In-memory array to act as our database
const users: User[] = [];
const rsvps: Rsvp[] = [];

export const db = {
    async findUserByEmail(email: string): Promise<User | null> {
        console.log(`[DB MOCK] Searching for user with email: ${email}`);
        const user = users.find((u) => u.Email === email);
        console.log(user ? `[DB MOCK] User found.` : `[DB MOCK] User not found.`);
        return user || null;
    },

    async findUserById(id: string): Promise<User | null> {
        console.log(`[DB MOCK] Searching for user with ID: ${id}`);
        const user = users.find((u) => u.AetherID === id);
        console.log(user ? `[DB MOCK] User found.` : `[DB MOCK] User not found.`);
        return user || null;
    },

    async createUser(userData: Omit<User, 'CreatedAt' | 'ActivatedAt'>): Promise<User> {
        const existingUserIndex = users.findIndex(u => u.Email === userData.Email);

        const userRecord: User = {
            ...userData,
            CreatedAt: new Date(), 
            ActivatedAt: null,
        };

        if (existingUserIndex !== -1 && !users[existingUserIndex].IsActivated) {
            // Update existing unverified user
            console.log(`[DB MOCK] Updating existing user: ${userData.Email}`);
            users[existingUserIndex] = { ...users[existingUserIndex], ...userRecord };
            return users[existingUserIndex];
        } else {
            // Create new user
            console.log(`[DB MOCK] Creating new user: ${userData.Email} with Aether ID: ${userData.AetherID}`);
            users.push(userRecord);
            return userRecord;
        }
    },

    async verifyUserByToken(token: string): Promise<User | null> {
        console.log(`[DB MOCK] Attempting to verify token: ${token}`);
        const userIndex = users.findIndex(
            (u) =>
                u.VerificationToken === token &&
                u.VerificationTokenExpires > new Date()
        );

        if (userIndex === -1) {
            console.log(`[DB MOCK] Token invalid or expired.`);
            return null;
        }

        const user = users[userIndex];
        user.IsActivated = true;
        user.ActivatedAt = new Date();
        user.VerificationToken = ''; // Invalidate the token after use
        
        console.log(`[DB MOCK] User ${user.Email} verified successfully.`);
        return user;
    },

    async updateUserToken(email: string, token: string, expires: Date): Promise<User | null> {
        console.log(`[DB MOCK] Updating token for user: ${email}`);
        const userIndex = users.findIndex((u) => u.Email === email && u.IsActivated);

        if (userIndex === -1) {
            console.log(`[DB MOCK] Could not find active user to update token.`);
            return null;
        }

        users[userIndex].VerificationToken = token;
        users[userIndex].VerificationTokenExpires = expires;

        console.log(`[DB MOCK] Token updated successfully for ${email}.`);
        return users[userIndex];
    },

    async createRsvp(rsvpData: Rsvp): Promise<Rsvp> {
        console.log(`[DB MOCK] Creating new RSVP for event: ${rsvpData['Event Code']}`);
        rsvps.push(rsvpData);
        return rsvpData;
    },

    async getRsvpCountForEvent(eventCode: string): Promise<number> {
        const count = rsvps.filter(r => r['Event Code'] === eventCode).length;
        console.log(`[DB MOCK] Found ${count} RSVPs for event ${eventCode}`);
        return count;
    },
};
