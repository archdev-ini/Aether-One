
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Tag, ServerCrash, BookX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/app/events/data";
import { Skeleton } from "@/components/ui/skeleton";

const eventTypes = ["All Types", "Workshop", "Talk", "Challenge", "Meetup"];
const communityFocuses = ["All Focuses", "Architecture", "AI in Design", "Web3", "Computational Design", "Sustainable Architecture", "General"];

function EventCardSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden">
            <Skeleton className="relative aspect-video w-full" />
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    );
}

interface EventsClientPageProps {
    initialEvents: Event[];
    initialError: string | null;
}

export function EventsClientPage({ initialEvents, initialError }: EventsClientPageProps) {
    const [dateFilter, setDateFilter] = useState("upcoming");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [focusFilter, setFocusFilter] = useState("All Focuses");
    
    // The loading state is now only for when filters change, not initial load.
    const [loading] = useState(false); 
    const [events] = useState<Event[]>(initialEvents);
    const [error] = useState<string | null>(initialError);


    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        const now = new Date();

        if (dateFilter === "upcoming" && eventDate < now) return false;
        if (dateFilter === "past" && eventDate >= now) return false;
        if (typeFilter !== "All Types" && event.type !== typeFilter) return false;
        if (focusFilter !== "All Focuses" && event.focus !== focusFilter) return false;

        return true;
    }).sort((a,b) => {
        if (dateFilter === 'upcoming') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const formatEventDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <>
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
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
                ) : error ? (
                    <div className="col-span-full text-center py-16 text-destructive">
                        <ServerCrash className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Could not load events</h3>
                        <p>{error}</p>
                    </div>
                ) : filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
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
                    ))
                ) : (
                    <div className="text-center col-span-full py-16 text-muted-foreground">
                        <BookX className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">No Events Found</h3>
                        <p>No events match the current filters.</p>
                    </div>
                )}
            </div>
        </>
    );
}
