
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { rsvpFormSchema, submitRsvp } from "@/actions/event.actions";

type User = {
  FullName: string;
  Email: string;
  AetherID: string;
  CityCountry: string;
  PreferredCommunityPlatform: string;
};

interface RsvpDialogProps {
  eventTitle: string;
  eventCode: string;
  user: User | null;
}

export function RsvpDialog({ eventTitle, eventCode, user }: RsvpDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof rsvpFormSchema>>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      eventCode: eventCode,
      fullName: user?.FullName || "",
      email: user?.Email || "",
      aetherId: user?.AetherID || "",
      cityCountry: user?.CityCountry || "",
      preferredPlatform: user?.PreferredCommunityPlatform || undefined,
      interest: "",
    },
  });

  async function onSubmit(values: z.infer<typeof rsvpFormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await submitRsvp(values);
      if (result.success) {
        toast({
          title: "RSVP Confirmed!",
          description: result.message,
        });
        form.reset();
        setIsOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: result.message || "Could not complete your RSVP.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Reserve My Spot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">RSVP for {eventTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to reserve your spot.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            {user && (
                 <FormField
                    control={form.control}
                    name="aetherId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Aether ID</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
             <FormField
                control={form.control}
                name="cityCountry"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City + Country <span className="text-muted-foreground">(Optional)</span></FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Accra, Ghana" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="preferredPlatform"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Preferred Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Discord">Discord</SelectItem>
                                <SelectItem value="Telegram">Telegram</SelectItem>
                                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                                <SelectItem value="X">X</SelectItem>
                                <SelectItem value="Instagram">Instagram</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your interest in this event <span className="text-muted-foreground">(Optional)</span></FormLabel>
                        <FormControl>
                            <Textarea rows={3} placeholder="e.g., I'm excited to learn about..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm RSVP
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
