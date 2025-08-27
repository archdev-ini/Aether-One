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
                Unlock a World of Design
              </h1>
              <p className="text-lg text-foreground/80 md:text-xl">
                Aether Ecosystem blends architecture and technology to empower creators. Access cutting-edge courses, a global community, and real-world challenges.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                  <Link href="/join">Join Aether</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-105 hover:bg-accent/50">
                  <Link href="#about">Discover Aether <ArrowRight className="ml-2" /></Link>
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
                    Aether Ecosystem is a digital-first school and community redefining architecture through AI, VR, and computational design. Join a vibrant network of designers and exclusive learning opportunities.
                  </p>
                  <p className="text-lg text-foreground/70">
                    Our vision is to inspire and equip creators to build a sustainable, tech-driven future. From parametric design courses to virtual collaboration spaces, we connect you to tools and ideas shaping the design world.
                  </p>
                  <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105 shadow-primary/20 hover:shadow-primary/40 hover:shadow-lg">
                    <Link href="/join">Get Started</Link>
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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Explore the Aether Ecosystem</h2>
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
                     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Get Involved</h2>
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
                        Discover design trends, case studies, and tips. Subscribe to our newsletter for the latest updates.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Input type="email" placeholder="Enter your email" className="max-w-sm" />
                        <Button size="lg" className="transition-transform duration-300 hover:scale-105 w-full sm:w-auto">Subscribe</Button>
                    </div>
                     <p className="text-sm mt-4 text-foreground/60">Join our community of innovators. <Link href="/join" className="underline hover:text-primary">Sign up now</Link>.</p>
                </div>
            </div>
        </section>

         {/* Social Links Section */}
        <section className="w-full py-16 md:py-24">
            <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary mb-4">Join Our Community</h2>
                <p className="mx-auto max-w-[700px] text-lg text-foreground/70 mb-12">
                   Connect with us on social platforms and join the conversation with fellow designers and creators.
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
    description: "Learn computational design, sustainable architecture, and AI-driven creativity with full access to expert-led courses.",
    cta: "Start Learning",
    href: "/programs",
    icon: Building,
    variant: "default" as const,
  },
  {
    title: "Community",
    description: "Connect with global designers on Discord, Telegram, and more. Join projects and share ideas.",
    cta: "Connect with Peers",
    href: "/join",
    icon: Users,
    variant: "secondary" as const,
  },
  {
    title: "Challenges",
    description: "Solve real-world design problems, from urban planning to eco-materials. Gain mentorship and earn rewards.",
    cta: "Join a Challenge",
    href: "#events",
    icon: Zap,
    variant: "ghost" as const,
  },
  {
    title: "Insights",
    description: "Get curated trends and tips with Aether Insights. Subscribe for personalized updates.",
    cta: "Subscribe Now",
    href: "#newsletter",
    icon: LandPlot,
    variant: "default" as const,
  },
];

const events = [
    {
        title: "Urban Futures Challenge",
        date: "Starts October 15, 2025",
        description: "Design a sustainable city block with AI tools. Prize: Expert mentorship.",
        image: "https://picsum.photos/600/400?grayscale",
        aiHint: "sustainable city AI",
        href: "/join",
        cta: "Register Now",
        variant: "secondary" as const,
    },
    {
        title: "Material Innovation Sprint",
        date: "Starts November 1, 2025",
        description: "Propose eco-friendly materials and win recognition.",
        image: "https://picsum.photos/600/401?grayscale",
        aiHint: "eco friendly materials",
        href: "/join",
        cta: "Enter the Sprint",
        variant: "secondary" as const,
    },
    {
        title: "World Architecture Day Launch",
        date: "October 6, 2025",
        description: "Join our virtual showcase featuring student projects, live talks, and awards.",
        image: "https://picsum.photos/600/402?grayscale",
        aiHint: "virtual showcase architecture",
        href: "/join",
        cta: "RSVP Here",
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
