import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, ToyBrick, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Aether — The Creative Ecosystem for Architects & Designers
              </h1>
              <p className="text-lg text-foreground/80 md:text-xl max-w-3xl mx-auto">
                A global-facing, Africa-rooted learning community. Get your permanent Aether ID, access exclusive events, and join the network shaping the future of design.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/join">Create Your Aether ID</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#events">View Events</Link>
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

        {/* Events Section */}
        <section id="events" className="w-full py-16 md:py-24 scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prelaunch Events Are Here</h2>
                <p className="text-lg text-foreground/70">
                  Join exclusive workshops and Q&As with industry leaders throughout October and November. Your Aether ID is your access pass.
                </p>
              </div>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">Aether Community Pre-Launch: Why Community Matters in Design Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground/80">
                  <p>
                    Join us on World Architecture Day, October 6, 2025, for the pre-launch of Aether Community, a digital-first architecture and design school empowering African creatives. Discover how peer learning, mentorship, and collective growth are transforming design education. Whether you’re a student dreaming of bold designs or a professional shaping Africa’s built future, this event is for you!
                  </p>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">What to Expect:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Inspiring opening by Inioluwa Oladipupo, Aether Community Lead.</li>
                      <li>1–2 minute teaser trailer unveiling Aether’s vision.</li>
                      <li>Panel discussion with a student, early-career designer, and seasoned architect on why community drives design innovation.</li>
                      <li>Live Q&A and poll to share your voice.</li>
                      <li>First look at Aether’s platforms and a teaser for our full launch on December 8, 2025.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-2">Why Attend?</h4>
                    <p>
                      <strong>Students:</strong> Connect with peers, explore free learning resources, and get inspired to build your portfolio.
                      <br />
                      <strong>Professionals:</strong> Network with industry leaders, discover mentorship opportunities, and shape African design. Be part of a movement to redefine design education from Nigeria to the world!
                    </p>
                  </div>
                   <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="#">See the Full Schedule</Link>
                  </Button>
                </CardContent>
              </Card>
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