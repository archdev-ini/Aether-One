import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Disc, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 text-foreground/70">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-center md:text-left">
            <Logo className="h-8 w-8 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Aether – Powered by Buildr Africa
            </p>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
            <Link href="/about" className="transition-colors hover:text-primary">About</Link>
            <Link href="#events" className="transition-colors hover:text-primary">Events</Link>
            <Link href="/faq" className="transition-colors hover:text-primary">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Discord">
              <Disc className="h-6 w-6 transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="X / Twitter">
              <svg className="h-5 w-5 fill-current transition-colors hover:text-primary" viewBox="0 0 1200 1227">
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6902H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p>© 2025 Aether by Buildr Africa. All rights reserved.</p>
          <p className="mt-2 text-primary">Full platform launch on December 8, 2025 — join now to secure your ID.</p>
        </div>
      </div>
    </footer>
  );
}