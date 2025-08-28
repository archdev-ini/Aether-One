import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { db } from '@/services/airtable';
import { DiscordLogo, TelegramLogo, WhatsappLogo } from '@/components/CommunityLogos';
import { Badge } from '@/components/ui/badge';

const communityLinks = {
    Discord: '#', // Replace with actual invite link
    WhatsApp: '#', // Replace with actual invite link
    Telegram: '#', // Replace with actual invite link
};

export default async function ProfilePage() {
    const cookieStore = cookies();
    const name = cookieStore.get('aether_user_name')?.value;
    const id = cookieStore.get('aether_user_id')?.value;

    if (!name || !id) {
        redirect('/join');
    }

    const user = await db.findUserById(id);

    if (!user) {
        // This case should ideally not happen if cookies are set correctly
        redirect('/login');
    }

    const preferredPlatform = user.PreferredCommunityPlatform;
    const otherPlatforms = Object.keys(communityLinks).filter(p => p !== preferredPlatform) as (keyof typeof communityLinks)[];

    return (
        <div className="container py-16 md:py-24">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                     <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${id}`} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl">{name}</CardTitle>
                    <CardDescription>Your Aether ID: {id}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6">
                        🎉 Your Aether ID is now active! Welcome to the ecosystem.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="/programs">Explore Programs</Link>
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4 pt-6 border-t">
                    <div className="text-center">
                        <h3 className="font-semibold text-lg">Join the Community</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                            Your preferred platform is {preferredPlatform}. Connect with other members now!
                        </p>
                    </div>
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href={communityLinks[preferredPlatform as keyof typeof communityLinks]}>
                            {preferredPlatform === 'Discord' && <DiscordLogo className="mr-2 h-5 w-5" />}
                            {preferredPlatform === 'WhatsApp' && <WhatsappLogo className="mr-2 h-5 w-5" />}
                            {preferredPlatform === 'Telegram' && <TelegramLogo className="mr-2 h-5 w-5" />}
                            Join on {preferredPlatform}
                        </Link>
                    </Button>
                     <div className="flex gap-4 items-center">
                        <span className="text-xs text-muted-foreground">Other platforms:</span>
                        {otherPlatforms.map(platform => (
                             <Button asChild variant="ghost" size="icon" key={platform} title={`Join on ${platform}`}>
                                <Link href={communityLinks[platform]}>
                                    {platform === 'Discord' && <DiscordLogo className="h-5 w-5" />}
                                    {platform === 'WhatsApp' && <WhatsappLogo className="h-5 w-5" />}
                                    {platform === 'Telegram' && <TelegramLogo className="h-5 w-5" />}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
