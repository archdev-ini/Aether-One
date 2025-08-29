
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Target, Heart, Leaf, Handshake, Globe, Search, Lightbulb, ServerCrash } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/services/airtable";

export const metadata: Metadata = {
    title: "About Aether",
    description: "Learn about Aether's story, mission, vision, and the values that drive our community of designers and architects."
};

const values = [
    {
        icon: Leaf,
        title: "Sustainability",
        description: "Designing with respect for people and planet."
    },
    {
        icon: Handshake,
        title: "Collaboration",
        description: "Co-creating across borders and disciplines."
    },
    {
        icon: Globe,
        title: "Global Reach, Local Empowerment",
        description: "Building globally, empowering communities locally."
    },
    {
        icon: Search,
        title: "Transparency",
        description: "Openness in vision, action, and growth."
    },
     {
        icon: Lightbulb,
        title: "Innovation",
        description: "Pushing the boundaries of design and technology."
    }
];

function ErrorDisplay({ title, message }: { title: string, message: string }) {
    return (
        <div className="text-center text-destructive bg-destructive/10 py-8 px-4 rounded-lg">
            <ServerCrash className="h-10 w-10 mx-auto mb-4" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-destructive/80">{message}</p>
        </div>
    );
}

export default async function AboutPage() {
    const aboutContent = await db.getAboutPageContent();

    return (
        <div className="flex flex-col">
            <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-card">
              <div className="absolute inset-0 z-0">
                 <Image
                    src="https://picsum.photos/1920/1081"
                    alt="Modern office with architectural models"
                    data-ai-hint="modern office"
                    fill
                    className="object-cover opacity-10"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              </div>
              <div className="container z-10">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                    Building the Future of Architecture, Together.
                </h1>
                <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
                    Aether is a global ecosystem for architects, designers, and visionaries—rooted in community, powered by collaboration, and inspired by innovation.
                </p>
              </div>
            </section>

            <section className="w-full py-16 md:py-24">
                <div className="container">
                     <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Our Story</h2>
                            {aboutContent?.story ? (
                                <div className="text-lg text-foreground/70 space-y-4 whitespace-pre-wrap">
                                    {aboutContent.story.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            ) : (
                                <ErrorDisplay title="Content Not Available" message="The story content could not be loaded at this time."/>
                            )}
                        </div>
                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                             <Image
                                src="https://picsum.photos/600/400"
                                alt="Diverse group of people collaborating online"
                                data-ai-hint="diverse people collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

             <section className="w-full py-16 md:py-24 bg-card">
                <div className="container">
                     <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                         <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 md:order-2">
                             <Image
                                src="https://picsum.photos/600/401"
                                alt="Abstract architectural rendering"
                                data-ai-hint="abstract architecture"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4 md:order-1">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Our Vision</h2>
                             {aboutContent?.vision ? (
                                <div className="text-lg text-foreground/70 space-y-4 whitespace-pre-wrap">
                                   {aboutContent.vision.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                             ) : (
                                <ErrorDisplay title="Content Not Available" message="The vision content could not be loaded at this time."/>
                             )}
                        </div>
                    </div>
                </div>
            </section>

             <section className="w-full py-16 md:py-24">
                <div className="container text-center">
                     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary mb-4">Our Values</h2>
                     <p className="mx-auto max-w-[700px] text-lg text-foreground/70 mb-12">
                        The principles that guide our ecosystem and community.
                    </p>
                    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                        {values.map((value) => (
                            <Card key={value.title} className="text-center p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-none">
                                <CardHeader className="items-center p-0">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                        <value.icon className="h-8 w-8" />
                                    </div>
                                    <CardTitle className="text-xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <p className="text-foreground/70">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             <section className="w-full py-16 md:py-24 bg-card">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary mb-4">The Team</h2>
                    <p className="mx-auto max-w-[700px] text-lg text-foreground/70 mb-12">
                        Behind Aether is a community of passionate creators, builders, and learners. Founded by Inioluwa Oladipupo, an architecture student and innovator, Aether continues to grow through the contributions of its members worldwide.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                         {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3">
                                <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden bg-muted">
                                  <Image src={`https://i.pravatar.cc/150?u=team${i}`} alt={`Team member ${i + 1}`} fill className="object-cover" />
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">Jane Doe</p>
                                    <p className="text-sm text-foreground/60">Lead Instructor</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <Button asChild size="lg" className="mt-12 transition-transform duration-300 hover:scale-105">
                        <Link href="/join">Join Our Community</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
