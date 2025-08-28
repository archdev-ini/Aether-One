
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockEvents } from "./data";


const eventTypes = ["All Types", "Workshop", "Talk", "Challenge", "Meetup"];
const communityFocuses = ["All Focuses", "Architecture", "AI in Design", "Web3", "Computational Design", "Sustainable Architecture", "General"];


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
        if (focusFilter !== "All Focuses" && event.focus !== focusFilter) return false;

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
                                            View Details <ArrowRight className="ml-2 h-4 w-4" />
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
