
export type UpdatePost = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    category: 'Announcement' | 'Event' | 'Opportunity';
    link: string;
};

export const mockUpdates: UpdatePost[] = [
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
