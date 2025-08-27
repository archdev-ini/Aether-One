import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap, Users, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-card">
          <div className="absolute inset-0 z-0">
             <Image
                src="https://picsum.photos/1920/1080"
                alt="Abstract architectural design"
                data-ai-hint="abstract architecture"
                fill
                className="object-cover opacity-10"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <div className="container px-4 md:px-6 z-10">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                The Future of Design Education
              </h1>
              <p className="text-lg text-foreground/80 md:text-xl">
                Aether is a digital-first school and community for the next generation of architects and designers. Learn, create, and connect.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                  <Link href="/join">Join Aether Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-105">
                  <Link href="/programs">Explore Programs <ArrowRight className="ml-2" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">What is Aether Ecosystem?</h2>
                  <p className="text-foreground/70 md:text-lg">
                    We offer two distinct learning paths designed to empower your creative journey. Whether you're building a foundation or pushing the boundaries of design, Aether provides the tools and community for your success.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <Card className="transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-2xl">Aether School</CardTitle>
                      <CardDescription>Structured courses and foundational learning for aspiring designers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Master the fundamentals of digital design and architecture with our comprehensive curriculum, expert-led workshops, and hands-on projects.</p>
                       <Button asChild variant="link" className="px-0 mt-2">
                          <Link href="/programs#school">Learn More <ArrowRight className="ml-1" /></Link>
                        </Button>
                    </CardContent>
                  </Card>
                   <Card className="transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-2xl">Horizon Studio</CardTitle>
                      <CardDescription>Advanced, project-based exploration for innovative creators.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Collaborate on cutting-edge projects, experiment with emerging technologies, and build a portfolio that stands out in the industry.</p>
                       <Button asChild variant="link" className="px-0 mt-2">
                          <Link href="/programs#studio">Discover the Studio <ArrowRight className="ml-1" /></Link>
                        </Button>
                    </CardContent>
                  </Card>
                </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Why Choose Aether?</h2>
                <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are more than just an online school. We are a thriving ecosystem designed for growth, collaboration, and innovation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
              <div className="grid gap-2 text-center transition-transform duration-300 hover:scale-105">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                    <Zap className="h-8 w-8 text-primary" />
                 </div>
                <h3 className="text-xl font-bold">Cutting-Edge Curriculum</h3>
                <p className="text-foreground/70">Our programs are constantly updated to reflect the latest industry trends and technologies.</p>
              </div>
              <div className="grid gap-2 text-center transition-transform duration-300 hover:scale-105">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                    <Users className="h-8 w-8 text-primary" />
                 </div>
                <h3 className="text-xl font-bold">Vibrant Community</h3>
                <p className="text-foreground/70">Connect with peers, mentors, and industry professionals in our exclusive online community.</p>
              </div>
              <div className="grid gap-2 text-center transition-transform duration-300 hover:scale-105">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                 </div>
                <h3 className="text-xl font-bold">Real-World Projects</h3>
                <p className="text-foreground/70">Build a professional portfolio by working on hands-on projects that solve real-world challenges.</p>
              </div>
            </div>
          </div>
        </section>

         <section className="w-full py-16 md:py-24">
          <div className="container text-center">
             <div className="max-w-2xl mx-auto">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Ready to Build the Future?</h2>
                <p className="mt-4 text-lg text-foreground/70">
                    Join a community of forward-thinking designers and architects. Your journey starts here.
                </p>
                <div className="mt-8">
                     <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                        <Link href="/join">Become a Member Today</Link>
                    </Button>
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
