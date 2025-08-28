
export type Resource = {
    id: string;
    title: string;
    category: 'Architecture & Design' | 'Technology & Web3' | 'Community & Leadership' | 'Aether Insights';
    type: 'Article' | 'Video' | 'PDF' | 'Tool' | 'Course';
    author: string;
    tags: string[];
    link: string;
    access: 'Public' | 'Members-only';
    dateAdded: string;
    description: string;
};

export const mockResources: Resource[] = [
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
