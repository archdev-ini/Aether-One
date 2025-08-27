import { Logo } from "@/components/Logo";
import Link from "next/link";
import { AetherIDBadge } from "../AetherIDBadge";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/join", label: "Join Aether" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ/Contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12 text-foreground/70">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Navigate</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div className="flex flex-col items-center justify-center text-center">
             <Logo className="h-12 w-12 mb-4 text-primary" />
             <p className="text-sm">
                © {new Date().getFullYear()} Aether Ecosystem. All rights reserved.
             </p>
             <div className="text-sm mt-2">
                 <Link href="#" className="transition-colors hover:text-primary">Privacy Policy</Link>
                 <span className="mx-2">|</span>
                 <Link href="#" className="transition-colors hover:text-primary">Terms of Service</Link>
             </div>
          </div>

          {/* Contact */}
          <div className="space-y-3 md:text-right">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <ul className="space-y-2">
                <li>
                    <a href="mailto:contact@aethercommunity.vercel.app" className="text-sm transition-colors hover:text-primary">
                        contact@aethercommunity.vercel.app
                    </a>
                </li>
                <li>
                    <Link href="/faq" className="text-sm transition-colors hover:text-primary font-semibold">
                       Contact Us
                    </Link>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
