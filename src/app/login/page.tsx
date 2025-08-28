
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { sendLoginLink } from "@/actions/auth.actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmissionMessage(null);
    try {
        const result = await sendLoginLink(values.email);
        if (result.success) {
            setSubmissionMessage(result.message);
            form.reset();
        } else {
             toast({
                variant: "destructive",
                title: "Something went wrong",
                description: result.message,
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
    <div className="w-full min-h-[60vh] flex items-center justify-center py-16 md:py-24">
        <div className="container">
            <Card className="max-w-md mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-center">Member Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to receive a magic link to sign in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {submissionMessage ? (
                         <Alert>
                            <AlertTitle>Check your email</AlertTitle>
                            <AlertDescription>
                                {submissionMessage}
                            </AlertDescription>
                        </Alert>
                    ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            
                            <Button type="submit" disabled={isSubmitting} className="w-full transition-all hover:shadow-lg hover:shadow-primary/50 hover:scale-105" size="lg">
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Magic Link
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
