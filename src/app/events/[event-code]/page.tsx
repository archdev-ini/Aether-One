
import { mockEvents } from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EventDetailPageProps {
    params: {
        'event-code': string;
    }
}

export async function generateMetadata({ params }: EventDetailPageProps) {
    const event = mockEvents.find(e => e.code === params['event-code']);

    if (!event) {
        return {
            title: "Event Not Found",
        }
    }

    return {
        title: event.title,
        description: event.description,
    }
}


export default function EventDetailPage({ params }: EventDetailPageProps) {
    const event = mockEvents.find(e => e.code === params['event-code']);

    if (!event) {
        notFound();
    }

    const formatEventDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

     const formatEventTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        });
    };

    return (
        <div className="flex flex-col">
            {/* Header with Banner Image */}
            <section className="relative w-full h-[40vh] md:h-[50vh]">
                <Image 
                    src={event.image}
                    alt={`Banner for ${event.title}`}
                    fill
                    className="object-cover"
                    data-ai-hint={event.aiHint}
                />
                 <div className="absolute inset-0 bg-black/50" />
                 <div className="absolute inset-0 flex items-end container py-8">
                     <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                         {event.title}
                     </h1>
                 </div>
            </section>

            <div className="container py-12">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">About The Event</h2>
                            <p className="text-lg text-foreground/80 whitespace-pre-wrap">{event.longDescription}</p>
                        </div>
                        
                        {event.speakers && event.speakers.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">Speakers & Hosts</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {event.speakers.map(speaker => (
                                        <div key={speaker.name} className="flex items-start gap-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={speaker.avatar} alt={speaker.name} />
                                                <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-bold">{speaker.name}</h3>
                                                <p className="text-sm text-primary">{speaker.title}</p>
                                                <p className="text-sm text-muted-foreground mt-1">{speaker.bio}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {event.agenda && event.agenda.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">Agenda</h2>
                                <Card>
                                    <CardContent className="p-6">
                                        <ul className="space-y-4">
                                            {event.agenda.map((item, index) => (
                                                <li key={index} className="flex gap-4 items-start">
                                                    <div className="font-bold text-primary/80 w-24 tabular-nums text-right">{item.time}</div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold">{item.topic}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                    </div>

                    {/* Sidebar with Info and RSVP */}
                    <aside className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <Button size="lg" className="w-full">RSVP Now</Button>
                                <p className="text-center text-sm text-muted-foreground mt-2">Secure your spot!</p>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                               <div className="flex items-center gap-3">
                                   <Calendar className="h-5 w-5 text-primary" />
                                   <div>
                                       <p className="font-semibold">Date</p>
                                       <p className="text-muted-foreground">{formatEventDate(event.date)}</p>
                                   </div>
                               </div>
                               <div className="flex items-center gap-3">
                                   <Clock className="h-5 w-5 text-primary" />
                                   <div>
                                       <p className="font-semibold">Time</p>
                                       <p className="text-muted-foreground">{formatEventTime(event.date)}</p>
                                   </div>
                               </div>
                               <div className="flex items-center gap-3">
                                   <MapPin className="h-5 w-5 text-primary" />
                                   <div>
                                       <p className="font-semibold">Location</p>
                                       <p className="text-muted-foreground">{event.platform} ({event.location})</p>
                                   </div>
                               </div>
                                <Separator className="my-4"/>
                                <div className="flex flex-wrap gap-2">
                                     <Badge variant="outline">{event.type}</Badge>
                                     <Badge variant="outline">{event.focus}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                 </div>
            </div>
        </div>
    );
}

// This allows Next.js to pre-render all event pages at build time
export async function generateStaticParams() {
    return mockEvents.map((event) => ({
        'event-code': event.code,
    }))
}
