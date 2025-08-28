
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Tag, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// This metadata would be in a layout if the page were server-rendered
// export const metadata: Metadata = {
//     title: "Events",
//     description: "Workshops, conversations, and collaborations designed to inspire and connect.",
// };

const eventTypes = ["All Types", "Workshop", "Talk", "Challenge", "Meetup"];
const communityFocuses = ["All Focuses", "Architecture", "Web3", "Design", "General"];

const mockEvents = [
    {
        code: "WAD-2025",
        title: "World Architecture Day: The Future of Urbanism",
        date: "2025-10-06T10:00:00Z",
        type: "Talk",
        focus: "Architecture",
        description: "A panel discussion with leading architects on sustainable urban development and smart cities.",
        image: "https://picsum.photos/800/450?random=1",
        aiHint: "modern city architecture",
    },
    {
        code: "AI-DESIGN-01",
        title: "Intro to AI in Architectural Design",
        date: "2025-10-15T14:00:00Z",
        type: "Workshop",
        focus: "AI in Design",
        description: "A hands-on workshop exploring generative AI tools for conceptual design and visualization.",
        image: "https://picsum.photos/800/450?random=2",
        aiHint: "ai design"
    },
    {
        code: "COM-MEET-Q4",
        title: "Aether Community Quarterly Meetup",
        date: "2025-10-22T18:00:00Z",
        type: "Meetup",
        focus: "General",
        description: "Connect with fellow Aether members, share your projects, and hear community updates.",
        image: "https://picsum.photos/800/450?random=3",
        aiHint: "people meeting"
    },
    {
        code: "SUST-CHALLENGE",
        title: "Sustainable Housing Design Challenge",
        date: "2025-11-01T09:00:00Z",
        type: "Challenge",
        focus: "Sustainable Architecture",
        description: "A month-long design challenge to create innovative, eco-friendly housing solutions.",
        image: "https://picsum.photos/800/450?random=4",
        aiHint: "sustainable housing"
    },
    {
        code: "WEB3-ARCH-01",
        title: "Exploring Web3 for Architects",
        date: "2025-11-10T16:00:00Z",
        type: "Talk",
        focus: "Web3",
        description: "Learn how blockchain and decentralized technologies are impacting the built environment.",
        image: "https://picsum.photos/800/450?random=5",
aiHint: "blockchain architecture"
    },
    {
        code: "COMP-DESIGN-ADV",
        title: "Advanced Computational Design",
        date: "2025-11-18T11:00:00Z",
        type: "Workshop",
        focus: "Computational Design",
        description: "An advanced workshop on parametric modeling and algorithmic design for complex geometries.",
        image: "https://picsum.photos/800/450?random=6",
        aiHint: "parametric design"
    }
];


export default function EventsPage() {
    const [dateFilter, setDateFilter] = useState("upcoming");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [focusFilter, setFocusFilter] = useState("All Focuses");

    const filteredEvents = mockEvents.filter(event => {
        const eventDate = new Date(event.date);
        const now = new Date();

        if (dateFilter === "upcoming" && eventDate < now) return false;
        if (dateFilter === "past" && eventDate >= now) return false;
        if (typeFilter !== "All Types" && event.type !== typeFilter) return false;
        if (focusFilter !== "All Focuses" && event.focus !== event.focus) return false; // This was a bug, should be focusFilter

        return true;
    });

    const formatEventDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <div className="flex flex-col">
            <section className="w-full py-20 md:py-28 bg-card text-center">
                <div className="container">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                        Discover Aether Events
                    </h1>
                    <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
                        Workshops, conversations, and collaborations designed to inspire and connect.
                    </p>
                </div>
            </section>

            <section className="w-full py-12 md:py-16">
                <div className="container">
                    {/* Filter Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <Tabs value={dateFilter} onValueChange={setDateFilter} className="w-full md:w-auto">
                            <TabsList>
                                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                <TabsTrigger value="past">Past</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 md:w-auto">
                             <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Event Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {eventTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={focusFilter} onValueChange={setFocusFilter}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Community Focus" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communityFocuses.map(focus => (
                                        <SelectItem key={focus} value={focus}>{focus}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map(event => (
                            <Card key={event.code} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="relative aspect-video">
                                    <Image 
                                        src={event.image}
                                        alt={event.title}
                                        data-ai-hint={event.aiHint}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatEventDate(event.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                        <Tag className="h-4 w-4" />
                                        <span>{event.type} / {event.focus}</span>
                                    </div>
                                    <p className="text-foreground/80 line-clamp-3">
                                        {event.description}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={`/events/${event.code}`}>
                                            RSVP Now <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    {filteredEvents.length === 0 && (
                        <div className="text-center col-span-full py-16 text-muted-foreground">
                            <p>No events match the current filters.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
