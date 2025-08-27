
// This is a mock database service.
// In a real application, you would replace this with a connection to a real database like Airtable, Firebase, or PostgreSQL.

type User = {
    fullName: string;
    email: string;
    cityCountry: string;
    ageRange: string;
    currentRole: string;
    mainInterest: string;
    preferredCommunityPlatform: string;
    socialHandle?: string;
    goals?: string;
    aetherId: string;
    verificationToken: string;
    verificationTokenExpires: Date;
    verified: boolean;
};

// In-memory array to act as our database
const users: User[] = [];

export const db = {
    async findUserByEmail(email: string): Promise<User | null> {
        console.log(`[DB MOCK] Searching for user with email: ${email}`);
        const user = users.find((u) => u.email === email);
        console.log(user ? `[DB MOCK] User found.` : `[DB MOCK] User not found.`);
        return user || null;
    },

    async createUser(userData: Omit<User, 'createdAt' | 'activatedAt'>): Promise<User> {
        const existingUserIndex = users.findIndex(u => u.email === userData.email);

        const userRecord: User = {
            ...userData,
            // In a real DB, these would be handled by the DB.
            // createdAt: new Date(), 
            // activatedAt: null,
        };

        if (existingUserIndex !== -1) {
            // Update existing unverified user
            console.log(`[DB MOCK] Updating existing user: ${userData.email}`);
            users[existingUserIndex] = { ...users[existingUserIndex], ...userRecord };
            return users[existingUserIndex];
        } else {
            // Create new user
            console.log(`[DB MOCK] Creating new user: ${userData.email} with Aether ID: ${userData.aetherId}`);
            users.push(userRecord);
            return userRecord;
        }
    },

    async verifyUserByToken(token: string): Promise<User | null> {
        console.log(`[DB MOCK] Attempting to verify token: ${token}`);
        const userIndex = users.findIndex(
            (u) =>
                u.verificationToken === token &&
                u.verificationTokenExpires > new Date()
        );

        if (userIndex === -1) {
            console.log(`[DB MOCK] Token invalid or expired.`);
            return null;
        }

        const user = users[userIndex];
        user.verified = true;
        // In a real DB, you'd set activatedAt here.
        // user.activatedAt = new Date();
        user.verificationToken = ''; // Invalidate the token after use
        
        console.log(`[DB MOCK] User ${user.email} verified successfully.`);
        return user;
    },
};
