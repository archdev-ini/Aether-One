
export type UpdatePost = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    category: 'Update' | 'Opportunity' | 'Event' | 'Release';
    link: string;
};
