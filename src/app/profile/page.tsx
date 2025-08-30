
'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {useState, useEffect} from 'react';
import {Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {updateUserProfile} from '@/actions/auth.actions';
import {Checkbox} from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2, {message: 'Full name must be at least 2 characters.'}),
  city: z.string().min(2, {message: 'City is required.'}),
  country: z.string().min(2, {message: 'Country is required.'}),
  phone: z.string().optional(),
  interests: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
  consent: z.literal(true, {
    errorMap: () => ({message: 'You must agree to the community rules.'}),
  }),
});

const interests = [
  {id: 'Architecture', label: 'Architecture'},
  {id: 'Web3', label: 'Web3'},
  {id: 'Sustainability', label: 'Sustainability'},
  {id: 'Design', label: 'Design'},
  {id: 'Community', label: 'Community'},
  {id: 'Other', label: 'Other'},
];

// This is a simplified stand-in for fetching user data.
// In a real app, you'd fetch this from your backend/API.
async function getUserData() {
    // This is a placeholder. In a real app, you'd get this from a server component or an API call.
    // For this client component, we'll assume the data is passed in or fetched.
    // This part will need to be connected to the actual user session.
    return {
        isProfileComplete: false, // Placeholder
        email: "user@example.com", // Placeholder
        name: "New User", // Placeholder
    }
}


export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Here we would normally fetch user data
        // For now, we simulate it
        getUserData().then(data => {
            setUser(data);
            setLoading(false);
        });
    }, []);

    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            email: user?.email || '',
            fullName: user?.name || '',
            city: '',
            country: '',
            phone: '',
            interests: [],
            consent: false,
        },
    });

    // Sync form with user data when it loads
    useEffect(() => {
        if(user) {
            form.reset({
                email: user.email,
                fullName: user.name,
                city: '',
                country: '',
                phone: '',
                interests: [],
                consent: false,
            });
        }
    }, [user, form]);


    async function onSubmit(values: z.infer<typeof profileFormSchema>) {
        setIsSubmitting(true);
        try {
        const result = await updateUserProfile(values);
        if (result.success) {
            toast({
            title: 'Profile Updated!',
            description: "Welcome to Aether! You'll now be redirected.",
            });
            router.push('/');
        } else {
            toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description:
                result.message || 'There was a problem with your submission.',
            });
        }
        } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
        });
        } finally {
        setIsSubmitting(false);
        }
    }

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    // In a real app, we would have better logic for this based on actual user data.
    const isProfileComplete = false; 

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        {isProfileComplete ? (
             <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Welcome back to Aether! Your profile is complete.</p>
                    <Button asChild className="mt-4" onClick={() => router.push('/')}>
                        Go to Homepage
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <CardDescription>
                    Welcome to Aether! Please complete your profile to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="fullName"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <FormField
                            control={form.control}
                            name="city"
                            render={({field}) => (
                                <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Lagos" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="country"
                            render={({field}) => (
                                <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Nigeria" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel>WhatsApp / Telegram Number (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="interests"
                        render={() => (
                            <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Interest Areas</FormLabel>
                                <FormDescription>
                                Select the topics that interest you the most.
                                </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            {interests.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="interests"
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
                        name="consent"
                        render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                            </FormItem>
                        )}
                        />

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save and Continue
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        )}
        </div>
    );
}

