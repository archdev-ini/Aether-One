import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Users, Zap, LandPlot, Instagram, X, Linkedin, Disc, Send, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-card">
          <div className="absolute inset-0 z-0">
             <Image
                src="https://picsum.photos/1920/1080"
                alt="Abstract architectural render with white, blue, and purple palette"
                data-ai-hint="abstract architecture design"
                fill
                className="object-cover opacity-10"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <div className="container px-4 md:px-6 z-10">
            <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                Your Aether ID: Unlock a World of Design
              </h1>
              <p className="text-lg text-foreground/80 md:text-xl">
                The Aether Ecosystem blends architecture and technology to empower creators. Get your Aether ID to access cutting-edge courses, global community, and real-world challenges.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                  <Link href="/join">Get Your Aether ID</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-105 hover:bg-accent/50">
                  <Link href="#about">Discover Aether</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Aether Section */}
        <section id="about" className="w-full py-16 md:py-24 bg-background scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Aether Ecosystem: Where Design Meets Tomorrow</h2>
                  <p className="text-lg text-foreground/70">
                    Aether Ecosystem is a digital-first school and community redefining architecture through AI, VR, and computational design. Your Aether ID unlocks a vibrant network of designers and exclusive learning opportunities.
                  </p>
                  <p className="text-lg text-foreground/70">
                    To inspire and equip creators to build a sustainable, tech-driven future. Start with your Aether ID to join the movement. From parametric design courses to virtual collaboration spaces, your Aether ID connects you to tools and ideas shaping the design world.
                  </p>
                  <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105 shadow-primary/20 hover:shadow-primary/40 hover:shadow-lg">
                    <Link href="/join">Start with Aether ID</Link>
                  </Button>
                </div>
                <div className="relative aspect-square">
                     <Image
                        src="https://picsum.photos/600/600"
                        alt="Futuristic design project"
                        data-ai-hint="futuristic design"
                        fill
                        className="object-cover rounded-lg shadow-xl"
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="w-full py-16 md:py-24 bg-card">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Explore Aether with Your Aether ID</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offerings.map(offering => (
                        <Card key={offering.title} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                             <CardHeader className="items-center text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                  <offering.icon className="h-8 w-8" />
                                </div>
                                <CardTitle>{offering.title}</CardTitle>
                             </CardHeader>
                             <CardContent className="text-center">
                                <CardDescription>{offering.description}</CardDescription>
                                <Button asChild size="sm" className="mt-4" variant={offering.variant}>
                                    <Link href={offering.href}>{offering.cta}</Link>
                                </Button>
                             </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Events Section */}
        <section id="events" className="w-full py-16 md:py-24 scroll-mt-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Get Involved with Your Aether ID</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {events.map(event => (
                        <Card key={event.title} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <Image src={event.image} alt={event.title} width={600} height={400} className="object-cover w-full h-48" data-ai-hint={event.aiHint} />
                            <CardHeader>
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>{event.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/70 mb-4">{event.description}</p>
                                <Button asChild variant={event.variant} className="w-full">
                                    <Link href={event.href}>{event.cta}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-background">
            <div className="container">
                <div className="max-w-xl mx-auto text-center relative">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Stay Ahead with Aether Insights</h2>
                    <p className="mt-4 text-lg text-foreground/70">
                        Discover design trends, case studies, and tips tailored to you. Use your Aether ID to subscribe — or get one in seconds.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Input type="email" placeholder="Enter your email" className="max-w-sm" />
                        <Button size="lg" className="transition-transform duration-300 hover:scale-105 w-full sm:w-auto">Subscribe</Button>
                    </div>
                     <p className="text-sm mt-4 text-foreground/60">No Aether ID? <Link href="/join" className="underline hover:text-primary">Get one now</Link>.</p>
                </div>
            </div>
        </section>

         {/* Social Links Section */}
        <section className="w-full py-16 md:py-24">
            <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary mb-4">Join Our Community</h2>
                <p className="mx-auto max-w-[700px] text-lg text-foreground/70 mb-12">
                   Connect with us on social platforms. Use your Aether ID for exclusive channels on Discord, Telegram, and WhatsApp.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-4xl mx-auto">
                    {socials.map(social => (
                        <div key={social.name} className="group flex flex-col items-center space-y-2">
                             <a href={social.href} target="_blank" rel="noopener noreferrer" className="relative">
                                <social.icon className={`h-10 w-10 transition-colors duration-300 ${social.colorClass}`} />
                            </a>
                            <p className="text-sm font-medium">{social.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}

const offerings = [
  {
    title: "Aether School",
    description: "Learn computational design, sustainable architecture, and AI-driven creativity. Your Aether ID gives you full access to expert-led courses.",
    cta: "Learn with Aether ID",
    href: "/programs",
    icon: Building,
    variant: "default" as const,
  },
  {
    title: "Community",
    description: "Connect with global designers on Discord, Telegram, and more. Use your Aether ID to join projects and share ideas.",
    cta: "Connect with Aether ID",
    href: "/join",
    icon: Users,
    variant: "secondary" as const,
  },
  {
    title: "Challenges",
    description: "Solve real-world design problems, from urban planning to eco-materials. Your Aether ID opens the door to mentorship and rewards.",
    cta: "Join Challenges with Aether ID",
    href: "#events",
    icon: Zap,
    variant: "ghost" as const,
  },
  {
    title: "Insights",
    description: "Get curated trends and tips with Aether Insights. Sign up with your Aether ID for personalized updates.",
    cta: "Subscribe with Aether ID",
    href: "#newsletter",
    icon: LandPlot,
    variant: "default" as const,
  },
];

const events = [
    {
        title: "Urban Futures Challenge",
        date: "Starts October 15, 2025",
        description: "Design a sustainable city block with AI tools. Aether ID required. Prize: Expert mentorship.",
        image: "https://picsum.photos/600/400?grayscale",
        aiHint: "sustainable city AI",
        href: "/join",
        cta: "Join with Aether ID",
        variant: "secondary" as const,
    },
    {
        title: "Material Innovation Sprint",
        date: "Starts November 1, 2025",
        description: "Propose eco-friendly materials and win recognition. Access with Aether ID.",
        image: "https://picsum.photos/600/401?grayscale",
        aiHint: "eco friendly materials",
        href: "/join",
        cta: "Join with Aether ID",
        variant: "secondary" as const,
    },
    {
        title: "World Architecture Day Launch",
        date: "October 6, 2025",
        description: "Join our virtual showcase featuring student projects, live talks, and awards. RSVP with your Aether ID.",
        image: "https://picsum.photos/600/402?grayscale",
        aiHint: "virtual showcase architecture",
        href: "/join",
        cta: "RSVP with Aether ID",
        variant: "default" as const,
    }
]

const socials = [
  { name: "Instagram", icon: Instagram, href: "#", colorClass: "hover:text-pink-500" },
  { name: "X", icon: X, href: "#", colorClass: "hover:text-blue-400" },
  { name: "LinkedIn", icon: Linkedin, href: "#", colorClass: "hover:text-gray-400" },
  { name: "Discord", icon: Disc, href: "#", colorClass: "hover:text-purple-500" },
  { name: "Telegram", icon: Send, href: "#", colorClass: "hover:text-blue-500" },
  { name: "WhatsApp", icon: MessageSquare, href: "#", colorClass: "hover:text-gray-400" },
];
