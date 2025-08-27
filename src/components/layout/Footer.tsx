import { Logo } from "@/components/Logo";
import { Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const navLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
  { href: "/faq", label: "FAQ" },
];

const socialLinks = [
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Github, label: "GitHub" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline">Aether</span>
            </Link>
            <p className="text-sm text-foreground/70">
              The future of digital design education and community.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-semibold">Navigate</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-foreground/70 transition-colors hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/70 transition-colors hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
             <div className="space-y-3">
              <h4 className="font-semibold">Connect</h4>
              <div className="flex items-center space-x-2">
                {socialLinks.map((link) => (
                  <Button key={link.label} asChild variant="ghost" size="icon">
                    <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                      <link.icon className="h-5 w-5 text-foreground/70 transition-colors hover:text-primary" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} Aether Digital Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
