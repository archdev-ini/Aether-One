
"use client";

import { useState, useMemo } from "react";
import { mockResources, Resource } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Lock, Search } from "lucide-react";
import Link from "next/link";

const categories = ["All Categories", "Architecture & Design", "Technology & Web3", "Community & Leadership", "Aether Insights"];
const resourceTypes = ["All Types", "Article", "Video", "PDF", "Tool", "Course"];

export default function KnowledgePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [typeFilter, setTypeFilter] = useState("All Types");

    const filteredResources = useMemo(() => {
        return mockResources.filter(resource => {
            const matchesCategory = categoryFilter === "All Categories" || resource.category === categoryFilter;
            const matchesType = typeFilter === "All Types" || resource.type === typeFilter;
            const matchesSearch = searchTerm === "" || 
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            
            return matchesCategory && matchesType && matchesSearch;
        }).sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }, [searchTerm, categoryFilter, typeFilter]);

    return (
        <div className="flex flex-col">
            <section className="w-full py-20 md:py-28 bg-card text-center">
                <div className="container">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                        Knowledge Hub
                    </h1>
                    <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
                        A curated library of resources, insights, and tools for the modern designer.
                    </p>
                </div>
            </section>

            <section className="w-full py-12 md:py-16">
                <div className="container">
                    {/* Filter and Search Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-16 bg-background/80 backdrop-blur-sm py-4 z-10">
                        <div className="relative flex-grow">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                             <Input 
                                placeholder="Search by keyword, title, or tag..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 md:w-auto md:max-w-xs">
                             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {resourceTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResources.map(resource => (
                           <Card key={resource.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                               <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex-grow">
                                            <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
                                             <p className="text-sm text-muted-foreground mt-1">by {resource.author}</p>
                                        </div>
                                        {resource.access === 'Members-only' && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Lock className="h-5 w-5 text-primary ml-2 shrink-0" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Members-only</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                               </CardHeader>
                               <CardContent className="flex-grow flex flex-col justify-between">
                                    <p className="text-foreground/80 line-clamp-3 mb-4">{resource.description}</p>
                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge variant="secondary">{resource.category}</Badge>
                                            <Badge variant="outline">{resource.type}</Badge>
                                            {resource.tags.map(tag => (
                                                <Badge key={tag} variant="outline">{tag}</Badge>
                                            ))}
                                        </div>
                                        <Button asChild className="w-full">
                                            <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                                                Open Resource <ExternalLink className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                               </CardContent>
                           </Card>
                        ))}
                    </div>
                    {filteredResources.length === 0 && (
                        <div className="text-center col-span-full py-16 text-muted-foreground">
                            <BookOpen className="h-12 w-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold">No Resources Found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

// Minimal Tooltip components for this page to avoid prop drilling issues
const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
    const TooltipProvider = require('@/components/ui/tooltip').TooltipProvider;
    return <TooltipProvider>{children}</TooltipProvider>;
};

const Tooltip = ({ children }: { children: React.ReactNode }) => {
    const Tooltip = require('@/components/ui/tooltip').Tooltip;
    return <Tooltip>{children}</Tooltip>;
};

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => {
    const TooltipTrigger = require('@/components/ui/tooltip').TooltipTrigger;
    return <TooltipTrigger asChild>{children}</TooltipTrigger>;
};

const TooltipContent = ({ children }: { children: React.ReactNode }) => {
    const TooltipContent = require('@/components/ui/tooltip').TooltipContent;
    return <TooltipContent>{children}</TooltipContent>;
};
