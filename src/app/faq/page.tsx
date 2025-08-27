"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const faqItems = [
    {
        question: "Who is Aether for?",
        answer: "Aether is for anyone passionate about digital design and architecture, from complete beginners looking to build a foundation (Aether School) to experienced professionals seeking to innovate and collaborate (Horizon Studio)."
    },
    {
        question: "What is the difference between Aether School and Horizon Studio?",
        answer: "Aether School offers a structured curriculum with foundational courses, while Horizon Studio is a project-based environment for advanced designers to work on real-world challenges and build their portfolios."
    },
    {
        question: "Are the courses self-paced?",
        answer: "Yes, our courses are designed to be flexible. You can learn at your own pace while still benefiting from a structured curriculum and community support."
    },
    {
        question: "What kind of support can I expect?",
        answer: "Members get access to our exclusive community forum, weekly office hours with instructors, peer feedback sessions, and direct support from the Aether team."
    },
    {
        question: "Can I cancel my membership?",
        answer: "Yes, you can cancel your membership at any time. You will retain access until the end of your current billing period."
    }
];

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
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
            description: "Thanks for reaching out. We'll get back to you as soon as possible.",
        });
        form.reset();
    }

    return (
        <div className="w-full py-16 md:py-24">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">
                        Have Questions?
                    </h1>
                    <p className="text-lg text-foreground/80 mt-4">
                        Find answers to common questions below. If you can't find what you're looking for, feel free to reach out to us.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mt-12">
                    <Accordion type="single" collapsible className="w-full">
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
                
                <div className="max-w-3xl mx-auto mt-20 md:mt-24">
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Still Have Questions?</CardTitle>
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
            </div>
        </div>
    );
}
