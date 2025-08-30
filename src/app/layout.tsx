
import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Aether Digital Design',
    template: '%s | Aether Digital Design',
  },
  description: 'The future of digital design education and community, built for aspiring architects and designers.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const userName = cookieStore.get('aether_user_name')?.value;
  const userId = cookieStore.get('aether_user_id')?.value;
  
  const user = userName && userId ? { name: userName, id: userId } : null;
  
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-sans antialiased min-h-screen flex flex-col", inter.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header user={user} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
