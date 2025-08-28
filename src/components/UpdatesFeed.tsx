
'use client';

import { UpdatePost } from "@/app/updates/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { db } from "@/services/airtable";

const categoryStyles = {
    Announcement: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50",
    Event: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50",
    Opportunity: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50",
};


function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC', // Ensure date is not shifted by local time zone
    });
}

export function UpdatesFeed() {
    const [posts, setPosts] = useState<UpdatePost[]>([]);

    useEffect(() => {
        const fetchUpdates = async () => {
            const allUpdates = await db.getUpdates();
            setPosts(allUpdates);
        }
        fetchUpdates();
    }, []);

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
                <Card key={post.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                             <Badge className={cn("font-medium", categoryStyles[post.category])}>
                                {post.category}
                            </Badge>
                             <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                        </div>
                        <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardContent>
                         <Button asChild variant="outline" className="w-full">
                            <Link href={post.link}>
                                Read More <ArrowRight className="ml-2"/>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
