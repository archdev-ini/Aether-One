
import { db } from "@/services/airtable";
import { EventsClientPage } from "@/components/events/EventsClientPage";
import type { Event } from "./data";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aether Events",
    description: "Workshops, conversations, and collaborations designed to inspire and connect the Aether community."
};

export default async function EventsPage() {
    let events: Event[] = [];
    let error: string | null = null;

    try {
        events = await db.getEvents();
    } catch (err) {
        console.error("Failed to fetch events:", err);
        error = "Failed to load events. Please try again later.";
    }
    
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
                    <EventsClientPage initialEvents={events} initialError={error} />
                </div>
            </section>
        </div>
    )
}
