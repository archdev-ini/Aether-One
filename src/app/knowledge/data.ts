
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
