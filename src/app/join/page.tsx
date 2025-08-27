"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";


const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  location: z.string().min(2, { message: "City and country are required." }),
  ageRange: z.string({ required_error: "Please select an age range." }),
  currentRole: z.string({ required_error: "Please select your current role." }),
  mainInterest: z.string({ required_error: "Please select your main interest." }),
  preferredPlatform: z.string({ required_error: "Please select your preferred platform." }),
  socialHandle: z.string().optional(),
  goals: z.string().optional(),
});

export default function JoinPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      location: "",
      socialHandle: "",
      goals: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Success! Check your email to activate your Aether ID.",
      description: (
        <p>
          Didn&apos;t get the email?{" "}
          <Link href="#" className="text-primary hover:underline">
            Resend Link
          </Link>
        </p>
      ),
    });
    form.reset();
  }

  return (
    <div className="w-full py-16 md:py-24">
        <div className="container">
            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Get Your Aether ID</CardTitle>
                    <CardDescription>
                        Fill out this form to receive your unique Aether ID. Check your email to activate your profile and unlock the Aether Ecosystem—courses, community, challenges, and more.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            <FormLabel>City + Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Lagos, Nigeria" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ageRange"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Age Range</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your age range" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="under-18">Under 18</SelectItem>
                                                    <SelectItem value="18-24">18–24</SelectItem>
                                                    <SelectItem value="25-34">25–34</SelectItem>
                                                    <SelectItem value="35-44">35–44</SelectItem>
                                                    <SelectItem value="45+">45+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="currentRole"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your current role" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="student">Student</SelectItem>
                                                    <SelectItem value="professional-graduate">Professional Graduate</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="mainInterest"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Main Interest</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your main interest" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="computational-design">Computational Design</SelectItem>
                                                    <SelectItem value="sustainable-architecture">Sustainable Architecture</SelectItem>
                                                    <SelectItem value="ai-in-design">AI in Design</SelectItem>
                                                    <SelectItem value="community-collaboration">Community Collaboration</SelectItem>
                                                    <SelectItem value="challenges">Challenges</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="preferredPlatform"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Preferred Community Platform</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your preferred platform" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="discord">Discord</SelectItem>
                                                    <SelectItem value="telegram">Telegram</SelectItem>
                                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                                    <SelectItem value="x">X</SelectItem>
                                                    <SelectItem value="instagram">Instagram</SelectItem>
                                                    <SelectItem value="linkedin">LinkedIn</SelectItem>
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
                                            <FormLabel>X (Twitter) or Instagram Handle <span className="text-muted-foreground">(Optional)</span></FormLabel>
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
                            <Button type="submit" className="w-full transition-all hover:shadow-lg hover:shadow-primary/50 hover:scale-105" size="lg">Get My Aether ID</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    