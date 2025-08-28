
import { Button } from '@/components/ui/button';
import { BookOpen, ToyBrick, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UpdatesFeed } from '@/components/UpdatesFeed';
import { db } from '@/services/airtable';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const allEvents = await db.getEvents();
  const upcomingEvents = allEvents
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const featuredEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative w-full py-20 md:py-32"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
              url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16h20v20H16z' fill='none' stroke='hsla(var(--border)/0.2)' stroke-width='1'/%3E%3Cpath d='M0 0h52v52H0z' fill='none'/%3E%3C/svg%3E")
            `,
          }}
        >
           <div className="absolute inset-0 bg-background/90 z-0"></div>
          <div className="container px-4 md:px-6 z-10 relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                The Creative Ecosystem for Architects & Designers
              </h1>
              <p className="text-lg text-foreground/80 md:text-xl max-w-3xl mx-auto">
                A global-facing, Africa-rooted learning community. Get your permanent Aether ID, access exclusive events, and join the network shaping the future of design.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/join">Create Your Aether ID</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/events">View Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <BookOpen className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Learn</h3>
                <p className="text-foreground/70">
                  Access an Africa-first curriculum of courses, primers, and archives designed for the future of architecture.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <ToyBrick className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Build</h3>
                <p className="text-foreground/70">
                  Collaborate on real-world challenges, build portfolio-worthy projects, and earn verifiable credentials in Horizon Studio.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Connect</h3>
                <p className="text-foreground/70">
                  Join a global network of peers, mentors, and industry leaders. Share knowledge and find your next opportunity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Updates Feed Section */}
        <section className="w-full py-16 md:py-24">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay Updated with Aether</h2>
                    <p className="text-lg text-foreground/70">
                        Explore the latest news, events, and opportunities from the ecosystem.
                    </p>
                </div>
                <UpdatesFeed />
                 <div className="text-center mt-12">
                    <Button asChild size="lg">
                        <Link href="#">Subscribe on Substack</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 bg-primary/10">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Design the Future. Starting Now.</h2>
              <p className="text-lg text-foreground/70">
                The full Aether platform launches December 8. Create your permanent Aether ID today to become a founding member.
              </p>
              <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                <Link href="/join">Get Your Aether ID</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
