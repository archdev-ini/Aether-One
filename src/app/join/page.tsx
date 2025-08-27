"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Users, Video } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const benefits = [
    {
        icon: BookOpen,
        title: "Full Course Access",
        description: "Unlock our entire library of courses, from fundamentals to advanced topics."
    },
    {
        icon: Users,
        title: "Exclusive Community",
        description: "Join our private community to network with peers and industry experts."
    },
    {
        icon: Video,
        title: "Weekly Workshops",
        description: "Participate in live workshops on emerging technologies and techniques."
    }
]

export default function JoinPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Welcome to Aether! 🎉",
      description: "Your account has been created successfully. Check your email to verify.",
    });
    form.reset();
  }

  return (
    <div className="w-full py-16 md:py-24">
        <div className="container">
            <div className="max-w-xl mx-auto text-center">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
                    Become a Part of Aether
                </h1>
                <p className="text-lg text-foreground/80 mt-4">
                    Start your design journey today. Unlock exclusive content, join a vibrant community, and elevate your skills.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12 mb-16">
                {benefits.map(benefit => (
                    <div key={benefit.title} className="flex flex-col items-center text-center p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                            <benefit.icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-semibold text-lg">{benefit.title}</h3>
                        <p className="text-sm text-foreground/70 mt-1">{benefit.description}</p>
                    </div>
                ))}
            </div>

            <Card className="max-w-lg mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Create Your Account</CardTitle>
                    <CardDescription>Join in seconds. Your future in design awaits.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jane Doe" {...field} />
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
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" size="lg">Sign Up</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
