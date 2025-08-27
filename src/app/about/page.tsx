import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Target, Heart } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About the Ecosystem",
    description: "Learn about Aether's mission, vision, and the values that drive our community of designers and architects."
};

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description: "To democratize design education, making cutting-edge knowledge and tools accessible to everyone, everywhere."
    },
    {
        icon: Eye,
        title: "Our Vision",
        description: "To cultivate a global community of innovators who are shaping the future of the built and digital worlds through collaboration and creativity."
    },
    {
        icon: Heart,
        title: "Our Values",
        description: "We are driven by curiosity, committed to excellence, and dedicated to fostering an inclusive and supportive learning environment."
    }
];

export default function AboutPage() {
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
                    Shaping the Future of Digital Design
                </h1>
                <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
                    Aether is more than a school; it's an ecosystem built on the belief that great design is born from community, curiosity, and a relentless pursuit of innovation.
                </p>
              </div>
            </section>

            <section className="w-full py-16 md:py-24">
                <div className="container">
                    <div className="grid gap-8 md:grid-cols-3">
                        {values.map((value) => (
                            <Card key={value.title} className="text-center p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <CardHeader className="items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                        <value.icon className="h-8 w-8" />
                                    </div>
                                    <CardTitle className="text-2xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground/70">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full py-16 md:py-24 bg-card">
                <div className="container">
                    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">A Global Community of Creators</h2>
                            <p className="text-lg text-foreground/70">
                                The heart of Aether is our diverse and vibrant community. Members from around the world come together to share ideas, collaborate on projects, and support each other's growth. We host regular virtual meetups, design challenges, and portfolio reviews to keep our community connected and inspired.
                            </p>
                             <Button asChild size="lg" className="mt-4 transition-transform duration-300 hover:scale-105">
                                 <Link href="/join">Join Our Community</Link>
                            </Button>
                        </div>
                        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                             <Image
                                src="https://picsum.photos/600/600"
                                alt="Diverse group of people collaborating online"
                                data-ai-hint="diverse people collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

             <section className="w-full py-16 md:py-24">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary mb-4">Meet Our Team</h2>
                    <p className="mx-auto max-w-[700px] text-lg text-foreground/70 mb-12">
                        Our instructors and mentors are industry-leading professionals and passionate educators dedicated to your success.
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
                </div>
            </section>
        </div>
    );
}
