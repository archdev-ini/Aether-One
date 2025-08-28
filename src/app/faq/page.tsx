"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const faqItems = [
    {
        question: "How do I join Aether?",
        answer: "You can join by filling out the Aether ID form on our homepage. Once registered, you’ll gain access to our platforms and opportunities."
    },
    {
        question: "What is an Aether ID?",
        answer: "An Aether ID is your unique membership identity within the ecosystem. It’s your passport to learning, collaboration, and events."
    },
    {
        question: "How do I collaborate or partner with Aether?",
        answer: "Fill out the form above or email us at partners@aether.xyz. We welcome partnerships with organizations, schools, and communities."
    },
    {
        question: "Which platforms is Aether active on?",
        answer: "We’re building across Discord, Telegram, WhatsApp, Instagram, X (Twitter), and Substack."
    },
];

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string({ required_error: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function FaqPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof contactFormSchema>) {
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. We'll get back to you with a ticket ID shortly.",
        });
        form.reset();
    }

    return (
        <div className="w-full py-16 md:py-24">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
                        We’d love to hear from you.
                    </h1>
                    <p className="text-lg text-foreground/80 mt-4">
                        Questions, partnerships, or press? Get in touch with the Aether team below.
                    </p>
                </div>
                
                <div className="max-w-3xl mx-auto mt-12 md:mt-16">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-3xl">Get In Touch</CardTitle>
                            <CardDescription>Send us a message and we'll get back to you shortly.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a subject" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                                        <SelectItem value="Partnership">Partnership</SelectItem>
                                                        <SelectItem value="Press">Press</SelectItem>
                                                        <SelectItem value="Support">Support</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Message</FormLabel>
                                                <FormControl>
                                                    <Textarea rows={5} placeholder="Tell us how we can help..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="text-center">
                                      <Button type="submit" size="lg">Send Message</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div className="max-w-3xl mx-auto mt-20 md:mt-24">
                     <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full mt-8">
                        {faqItems.map((item) => (
                            <AccordionItem value={item.question} key={item.question}>
                                <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-foreground/70">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </div>
        </div>
    );
}
