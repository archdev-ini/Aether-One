
// This is a mock database service.
// In a real application, you would replace this with a connection to a real database like Airtable, Firebase, or PostgreSQL.
import type { Event } from '@/app/events/data';
import type { Resource } from '@/app/knowledge/data';
import type { UpdatePost } from '@/app/updates/data';


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


const mockEvents: Event[] = [
    {
        code: "WAD-2025",
        title: "World Architecture Day: The Future of Urbanism",
        date: "2025-10-06T10:00:00Z",
        type: "Talk",
        focus: "Architecture",
        description: "A panel discussion with leading architects on sustainable urban development and smart cities.",
        image: "https://picsum.photos/800/450?random=1",
        aiHint: "modern city architecture",
        platform: "Zoom",
        location: "Online",
        longDescription: "Join us on World Architecture Day, October 6, 2025, for the pre-launch of Aether Community, a digital-first architecture and design school empowering African creatives. Discover how peer learning, mentorship, and collective growth are transforming design education. Whether you’re a student dreaming of bold designs or a professional shaping Africa’s built future, this event is for you!",
        speakers: [
            { name: "Dr. Elena Vance", title: "Urban Futurist & Architect", bio: "Dr. Vance is a renowned architect and urban planner whose work focuses on creating resilient and human-centric cities.", avatar: "https://i.pravatar.cc/150?u=speaker1" },
            { name: "Marcus Thorne", title: "Principal, Thorne Architects", bio: "Marcus Thorne leads an award-winning firm known for its groundbreaking sustainable high-rise designs.", avatar: "https://i.pravatar.cc/150?u=speaker2" },
        ],
        agenda: [
            { time: "10:00 AM", topic: "Opening Remarks & Introduction" },
            { time: "10:15 AM", topic: "Panel Discussion: The Next Decade of Urban Design" },
            { time: "11:15 AM", topic: "Live Q&A with Audience" },
            { time: "11:45 AM", topic: "Closing Remarks" },
        ],
        whatToExpect: [
            'Inspiring opening by Inioluwa Oladipupo, Aether Community Lead.',
            '1–2 minute teaser trailer unveiling Aether’s vision.',
            'Panel discussion with a student, early-career designer, and seasoned architect on why community drives design innovation.',
            'Live Q&A and poll to share your voice.',
            'First look at Aether’s platforms and a teaser for our full launch on December 8, 2025.',
        ],
        whyAttend: {
            students: 'Connect with peers, explore free learning resources, and get inspired to build your portfolio.',
            professionals: 'Network with industry leaders, discover mentorship opportunities, and shape African design. Be part of a movement to redefine design education from Nigeria to the world!',
        },
    },
    {
        code: "AI-DESIGN-01",
        title: "Intro to AI in Architectural Design",
        date: "2025-10-15T14:00:00Z",
        type: "Workshop",
        focus: "AI in Design",
        description: "A hands-on workshop exploring generative AI tools for conceptual design and visualization.",
        image: "https://picsum.photos/800/450?random=2",
        aiHint: "ai design",
        platform: "Discord",
        location: "Aether Community Discord",
        longDescription: "Unlock the power of Artificial Intelligence in your design process. This hands-on workshop will guide you through the latest AI tools that are revolutionizing architectural design. You will learn how to generate concepts, create stunning visualizations, and optimize your workflows. No prior AI experience is required, just a passion for the future of design.",
        speakers: [
            { name: "Jasmine Lee", title: "Computational Designer", bio: "Jasmine is a pioneer in the application of AI in architecture, with a portfolio of award-winning generative projects.", avatar: "https://i.pravatar.cc/150?u=speaker3" },
        ],
        agenda: [
            { time: "2:00 PM", topic: "Introduction to Generative AI" },
            { time: "2:30 PM", topic: "Hands-on Session: Midjourney for Architects" },
            { time: "3:30 PM", topic: "Advanced Techniques & Prompts" },
            { time: "4:00 PM", topic: "Project Showcase & Feedback" },
        ]
    },
    {
        code: "COM-MEET-Q4",
        title: "Aether Community Quarterly Meetup",
        date: "2025-10-22T18:00:00Z",
        type: "Meetup",
        focus: "General",
        description: "Connect with fellow Aether members, share your projects, and hear community updates.",
        image: "https://picsum.photos/800/450?random=3",
        aiHint: "people meeting",
        platform: "Twitter Spaces",
        location: "Live on X (Twitter)",
        longDescription: "Join us for our quarterly community meetup! This is a casual event to connect with fellow members, showcase the amazing projects you've been working on, and get the latest updates from the Aether team. We'll have open mic sessions, special announcements, and plenty of opportunities to network.",
        speakers: [
             { name: "Aether Community Team", title: "Hosts", bio: "Your friendly community managers and leads.", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=aether" },
        ],
        agenda: null
    },
    {
        code: "SUST-CHALLENGE",
        title: "Sustainable Housing Design Challenge",
        date: "2025-11-01T09:00:00Z",
        type: "Challenge",
        focus: "Sustainable Architecture",
        description: "A month-long design challenge to create innovative, eco-friendly housing solutions.",
        image: "https://picsum.photos/800/450?random=4",
        aiHint: "sustainable housing",
        platform: "Aether Platform",
        location: "Submissions via our website",
        longDescription: "Announcing the Aether Sustainable Housing Challenge! We invite designers and architects from around the world to develop innovative and eco-friendly housing solutions for the future. Over one month, you will research, design, and present a project that addresses key sustainability goals. Winners will receive prizes and be featured on the Aether homepage.",
        speakers: [],
        agenda: [
            { time: "Nov 1", topic: "Challenge Kick-off & Briefing" },
            { time: "Nov 15", topic: "Mid-point Check-in & Mentorship Session" },
            { time: "Nov 30", topic: "Submission Deadline" },
            { time: "Dec 8", topic: "Winners Announcement" },
        ]
    },
    {
        code: "WEB3-ARCH-01",
        title: "Exploring Web3 for Architects",
        date: "2025-11-10T16:00:00Z",
        type: "Talk",
        focus: "Web3",
        description: "Learn how blockchain and decentralized technologies are impacting the built environment.",
        image: "https://picsum.photos/800/450?random=5",
        aiHint: "blockchain architecture",
        platform: "Zoom",
        location: "Online",
        longDescription: "Web3 is more than just cryptocurrency. In this talk, we'll dive into how blockchain, NFTs, and the metaverse are creating new opportunities and challenges for architects and designers. From tokenizing real estate to designing virtual worlds, discover how the decentralized web is set to reshape the built environment.",
        speakers: [
            { name: "Leo Chen", title: "Founder, Metaprop", bio: "Leo is a venture capitalist and thought leader at the intersection of real estate, technology, and Web3.", avatar: "https://i.pravatar.cc/150?u=speaker4" },
        ],
        agenda: null,
    },
    {
        code: "COMP-DESIGN-ADV",
        title: "Advanced Computational Design",
        date: "2025-11-18T11:00:00Z",
        type: "Workshop",
        focus: "Computational Design",
        description: "An advanced workshop on parametric modeling and algorithmic design for complex geometries.",
        image: "https://picsum.photos/800/450?random=6",
        aiHint: "parametric design",
        platform: "Discord",
        location: "Aether Community Discord",
        longDescription: "Take your computational design skills to the next level. This advanced workshop is for designers who are already comfortable with parametric modeling and want to explore complex geometries, algorithmic design, and optimization scripts. We will be working with Rhino, Grasshopper, and Python to create sophisticated architectural forms.",
        speakers: [
             { name: "Sofia Al-Jamil", title: "Architectural Engineer", bio: "Sofia is an expert in computational design and has taught workshops at leading universities worldwide.", avatar: "https://i.pravatar.cc/150?u=speaker5" },
        ],
        agenda: [
            { time: "11:00 AM", topic: "Recap of Parametric Principles" },
            { time: "11:30 AM", topic: "Advanced Grasshopper Techniques" },
            { time: "1:00 PM", topic: "Lunch Break" },
            { time: "2:00 PM", topic: "Intro to Rhino.Python scripting" },
            { time: "3:30 PM", topic: "Project Work & 1-on-1 Mentoring" },
        ]
    }
];

const mockResources: Resource[] = [
    {
        id: 'res-001',
        title: 'Climate Responsive Design in Lagos',
        category: 'Architecture & Design',
        type: 'Article',
        author: 'Inioluwa Oladipupo',
        tags: ['Sustainable', 'Tropical', 'Urbanism'],
        link: '#',
        access: 'Public',
        dateAdded: '2025-08-27',
        description: 'An in-depth look at designing buildings in Lagos that respond to the local climate, reducing energy consumption and improving comfort.'
    },
    {
        id: 'res-002',
        title: 'Introduction to Parametric Design with Grasshopper',
        category: 'Technology & Web3',
        type: 'Video',
        author: 'Aether School',
        tags: ['Computational Design', 'Beginner'],
        link: '#',
        access: 'Members-only',
        dateAdded: '2025-08-25',
        description: 'A beginner-friendly video tutorial on the fundamentals of parametric design using Rhino and Grasshopper.'
    },
    {
        id: 'res-003',
        title: 'Building a Design Community from Scratch',
        category: 'Community & Leadership',
        type: 'Article',
        author: 'Aether Team',
        tags: ['Community', 'Networking'],
        link: '#',
        access: 'Public',
        dateAdded: '2025-08-22',
        description: 'Key strategies and lessons learned from building vibrant, collaborative design communities online and offline.'
    },
    {
        id: 'res-004',
        title: 'The Future of NFTs in Architecture',
        category: 'Technology & Web3',
        type: 'Aether Insights',
        author: 'Leo Chen',
        tags: ['Web3', 'NFTs', 'Future'],
        link: '#',
        access: 'Public',
        dateAdded: '2025-08-20',
        description: 'Exploring how non-fungible tokens could revolutionize architectural ownership, licensing, and virtual real estate.'
    },
    {
        id: 'res-005',
        title: 'Sustainable Materials Guide',
        category: 'Architecture & Design',
        type: 'PDF',
        author: 'Dr. Elena Vance',
        tags: ['Sustainability', 'Materials', 'Reference'],
        link: '#',
        access: 'Members-only',
        dateAdded: '2025-08-18',
        description: 'A comprehensive PDF guide to sustainable building materials, their properties, and sourcing information for West Africa.'
    },
    {
        id: 'res-006',
        title: 'Aether Prompt Library',
        category: 'Technology & Web3',
        type: 'Tool',
        author: 'Aether Community',
        tags: ['AI', 'Generative Design', 'Midjourney'],
        link: '#',
        access: 'Members-only',
        dateAdded: '2025-08-15',
        description: 'A community-curated library of effective prompts for generating architectural concepts with AI image generators.'
    }
];


const mockUpdates: UpdatePost[] = [
    {
        id: 'update-001',
        title: 'Aether Community is Live!',
        date: '2025-10-06',
        category: 'Announcement',
        excerpt: 'The Aether Community platform is now officially live. All verified members can now join our Discord, Telegram, and WhatsApp channels to start collaborating.',
        link: '#',
    },
    {
        id: 'update-002',
        title: 'Event: World Architecture Day Panel Discussion',
        date: '2025-09-30',
        category: 'Event',
        excerpt: 'Join us for a special panel discussion with industry leaders to celebrate World Architecture Day. We will be discussing the future of urbanism in Africa.',
        link: '/events/WAD-2025',
    },
    {
        id: 'update-003',
        title: 'Opportunity: Sustainable Housing Design Challenge',
        date: '2025-09-28',
        category: 'Opportunity',
        excerpt: 'We are launching a new design challenge focused on creating innovative and sustainable housing solutions. Prizes and features for the winning entries!',
        link: '/events/SUST-CHALLENGE',
    },
     {
        id: 'update-004',
        title: 'New Workshop: Intro to AI in Architectural Design',
        date: '2025-09-25',
        category: 'Event',
        excerpt: 'Enrollment is now open for our first hands-on workshop on using generative AI tools for conceptual design and visualization. Limited spots available.',
        link: '/events/AI-DESIGN-01',
    },
     {
        id: 'update-005',
        title: 'Aether Platform Launching Dec 8, 2025',
        date: '2025-09-22',
        category: 'Announcement',
        excerpt: 'The full Aether platform, including Aether School and Horizon Studio, is set to launch on December 8, 2025. Secure your Aether ID to become a founding member.',
        link: '#',
    },
     {
        id: 'update-006',
        title: 'Community Grant for Public Space Research',
        date: '2025-09-20',
        category: 'Opportunity',
        excerpt: 'We are partnering with the Design Futures Initiative to offer a grant for research projects focused on public spaces in African cities. Apply by November 1st.',
        link: '#',
    },
];


export const db = {
    // USER FUNCTIONS
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


    // RSVP / EVENT FUNCTIONS
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

    async getEvents(): Promise<Event[]> {
        console.log("[DB MOCK] Fetching all events.");
        return mockEvents;
    },

    async getEventByCode(code: string): Promise<Event | null> {
        console.log(`[DB MOCK] Fetching event with code: ${code}`);
        const event = mockEvents.find(e => e.code === code);
        return event || null;
    },

    // KNOWLEDGE HUB FUNCTIONS
    async getResources(): Promise<Resource[]> {
        console.log("[DB MOCK] Fetching all knowledge hub resources.");
        return mockResources;
    },

    // UPDATES FEED FUNCTIONS
    async getUpdates(): Promise<UpdatePost[]> {
        console.log("[DB MOCK] Fetching all update posts.");
        return mockUpdates;
    }
};

