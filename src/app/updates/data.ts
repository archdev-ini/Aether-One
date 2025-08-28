
export type UpdatePost = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    category: 'Announcement' | 'Event' | 'Opportunity';
    link: string;
};
