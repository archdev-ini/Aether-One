
export type Event = {
    code: string;
    title: string;
    date: string;
    type: "Talk" | "Workshop" | "Challenge" | "Meetup";
    focus: "Architecture" | "AI in Design" | "Web3" | "Computational Design" | "Sustainable Architecture" | "General";
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
    agenda: {
        time: string;
        topic: string;
    }[] | null;
    whatToExpect?: string[];
    whyAttend?: {
        students: string;
        professionals: string;
    };
};
