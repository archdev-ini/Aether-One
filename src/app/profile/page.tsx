
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
    const cookieStore = cookies();
    const name = cookieStore.get('aether_user_name')?.value;
    const id = cookieStore.get('aether_user_id')?.value;

    if (!name || !id) {
        redirect('/login');
    }

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
                        Welcome to the Aether ecosystem. Your journey starts now.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="/programs">Explore Programs</Link>
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="/events">View Events</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
