
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { createUser } from "@/actions/auth.actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";


const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  location: z.string().min(2, { message: "City and country are required." }),
  phone: z.string().optional(),
  professionalLevel: z.string({ required_error: "Please select your professional level." }),
  interestAreas: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one interest area.",
  }),
  socialHandle: z.string().optional(),
  goals: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the community rules." }),
  }),
});

const interestAreas = [
    { id: "Architecture & Design", label: "Architecture & Design" },
    { id: "Web3 & Technology", label: "Web3 & Technology" },
    { id: "Sustainability & Climate Action", label: "Sustainability & Climate Action" },
    { id: "Entrepreneurship & Leadership", label: "Entrepreneurship & Leadership" },
    { id: "Research & Innovation", label: "Research & Innovation" },
    { id: "Community Building", label: "Community Building" },
]

export default function JoinPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{title: string, description: React.ReactNode} | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      location: "",
      phone: "",
      interestAreas: [],
      socialHandle: "",
      goals: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmissionMessage(null);
    try {
        const result = await createUser(values);
        if (result.success) {
            setSubmissionMessage({
                title: "Success! Check your email to activate your Aether ID.",
                description: (
                    <p>
                        We've sent a verification link to {values.email}. Please check your inbox (and spam folder) to continue.
                    </p>
                )
            });
            form.reset();
        } else {
             toast({
                variant: "destructive",
                title: "Something went wrong",
                description: result.message || "There was a problem with your submission.",
            });
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full py-16 md:py-24">
        <div className="container">
            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Get Your Aether ID</CardTitle>
                    <CardDescription>
                        Fill out this form to unlock the Aether Ecosystem. Already have an ID?{" "}
                         <Link href={`/login${callbackUrl ? `?callbackUrl=${callbackUrl}`: ''}`} className="text-primary hover:underline">
                            Sign in here
                        </Link>
                        .
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {submissionMessage ? (
                         <Alert>
                            <AlertTitle>{submissionMessage.title}</AlertTitle>
                            <AlertDescription>
                                {submissionMessage.description}
                            </AlertDescription>
                        </Alert>
                    ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your full name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City & Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Lagos, Nigeria" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>WhatsApp / Telegram</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+234..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="professionalLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Professional Level</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your level" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Student">Student</SelectItem>
                                                    <SelectItem value="Early Career">Early Career</SelectItem>
                                                    <SelectItem value="Mid Career">Mid Career</SelectItem>
                                                    <SelectItem value="Expert/Professional">Expert/Professional</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="socialHandle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>X, LinkedIn, or IG Handle <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="@yourhandle" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                             <FormField
                                control={form.control}
                                name="interestAreas"
                                render={() => (
                                    <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Interest Areas</FormLabel>
                                        <FormDescription>
                                        Select all topics that apply to you.
                                        </FormDescription>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {interestAreas.map((item) => (
                                        <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="interestAreas"
                                        render={({ field }) => {
                                            return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...(field.value || []), item.id])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                            (value) => value !== item.id
                                                            )
                                                        )
                                                    }}
                                                />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                {item.label}
                                                </FormLabel>
                                            </FormItem>
                                            )
                                        }}
                                        />
                                    ))}
                                    </div>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                             <FormField
                                control={form.control}
                                name="goals"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What do you hope to achieve with Aether? <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} placeholder="e.g., To collaborate on innovative projects..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                             <FormField
                                control={form.control}
                                name="consent"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                        I agree to the Aether community rules and code of conduct.
                                        </FormLabel>
                                    </div>
                                     <FormMessage />
                                    </FormItem>
                                )}
                                />

                            <Button type="submit" disabled={isSubmitting} className="w-full transition-all hover:shadow-lg hover:shadow-primary/50 hover:scale-105" size="lg">
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Get My Aether ID
                            </Button>
                        </form>
                    </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    