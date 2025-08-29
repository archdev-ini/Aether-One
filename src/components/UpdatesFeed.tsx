
'use client';

import type { UpdatePost } from "@/services/airtable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ServerCrash } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { db } from "@/services/airtable";
import { Skeleton } from "./ui/skeleton";

const categoryStyles = {
    Update: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50",
    Event: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50",
    Opportunity: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50",
    Release: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50",
};


function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC', // Ensure date is not shifted by local time zone
    });
}

function UpdateCardSkeleton() {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter>
                 <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    )
}

export function UpdatesFeed() {
    const [posts, setPosts] = useState<UpdatePost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUpdates = async () => {
            setLoading(true);
            setError(null);
            try {
                const allUpdates = await db.getUpdates();
                setPosts(allUpdates);
            } catch(err) {
                setError("Could not load latest updates.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUpdates();
    }, []);

    if (loading) {
        return (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => <UpdateCardSkeleton key={i} />)}
            </div>
        )
    }

    if (error) {
         return (
            <div className="col-span-full text-center py-16 text-destructive bg-destructive/10 rounded-lg">
                <ServerCrash className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Could not load updates</h3>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
                <Card key={post.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                             <Badge className={cn("font-medium", categoryStyles[post.category as keyof typeof categoryStyles])}>
                                {post.category}
                            </Badge>
                             <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                        </div>
                        <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                         <Button asChild variant="outline" className="w-full">
                            <Link href={post.link}>
                                Read More <ArrowRight className="ml-2"/>
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
