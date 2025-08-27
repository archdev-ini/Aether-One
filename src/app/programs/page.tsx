import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Programs",
    description: "Explore Aether School and Horizon Studio, our two distinct learning paths for aspiring and advanced designers."
};

const schoolBenefits = [
    "Structured, modular curriculum",
    "Expert-led workshops",
    "Hands-on projects and assignments",
    "Peer and mentor feedback sessions",
];

const studioBenefits = [
    "Real-world client projects",
    "Advanced technology workshops",
    "Collaborative studio environment",
    "Portfolio and career development",
];

const testimonials = [
    {
        name: "Elena Rodriguez",
        role: "Aether School Graduate",
        quote: "Aether School gave me the confidence and skills to land my dream job in architectural visualization. The structured curriculum was exactly what I needed.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        name: "Ben Carter",
        role: "Horizon Studio Member",
        quote: "The collaborative projects at Horizon Studio are unparalleled. I'm working on things I never thought possible and building a portfolio that truly stands out.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e"
    },
];

export default function ProgramsPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-20 md:py-28 bg-card text-center">
        <div className="container">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
            Find Your Path
          </h1>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
            Whether you're starting your journey or pushing the boundaries of design, Aether has a program tailored for your growth.
          </p>
        </div>
      </section>

      <section id="school" className="w-full py-16 md:py-24 scroll-mt-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <Image 
                    src="https://picsum.photos/800/600"
                    alt="Students collaborating in a digital design class"
                    data-ai-hint="digital design class"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary">FOUNDATIONAL</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Aether School</h2>
              <p className="text-lg text-foreground/70">
                Aether School provides a structured, comprehensive curriculum for individuals looking to master the fundamentals of digital architecture and design. Build a strong foundation for your career.
              </p>
              <ul className="space-y-3">
                {schoolBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-foreground/80">{benefit}</span>
                    </li>
                ))}
              </ul>
               <Button asChild size="lg" className="mt-4 transition-transform duration-300 hover:scale-105">
                 <Link href="/join">Enroll in Aether School</Link>
               </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="w-full py-16 md:py-24 bg-card scroll-mt-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-6 md:order-2">
              <Badge variant="outline" className="text-primary border-primary">ADVANCED</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Horizon Studio</h2>
              <p className="text-lg text-foreground/70">
                Horizon Studio is an advanced, project-based environment for experienced designers to collaborate, innovate, and tackle real-world challenges. Push your creative limits and build an exceptional portfolio.
              </p>
              <ul className="space-y-3">
                {studioBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-foreground/80">{benefit}</span>
                    </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-4 transition-transform duration-300 hover:scale-105">
                 <Link href="/join">Apply to Horizon Studio</Link>
               </Button>
            </div>
             <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg md:order-1 transition-transform duration-300 hover:scale-105">
                <Image 
                    src="https://picsum.photos/800/601"
                    alt="Advanced 3D architectural model on a computer screen"
                    data-ai-hint="futuristic architecture"
                    fill
                    className="object-cover"
                />
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
            What Our Members Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <CardContent className="p-0">
                    <p className="text-foreground/80 italic mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-foreground/60">{testimonial.role}</p>
                        </div>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
