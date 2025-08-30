
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { sendLoginLink } from '@/actions/auth.actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await sendLoginLink(email);
      if (result.success) {
        setMessage(result.message || 'Check your email for the magic link!');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: result.message,
        });
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email to receive a magic link to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message ? (
             <Alert>
                <AlertTitle>Magic Link Sent!</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Send Magic Link'
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p>
            Don't have an Aether ID?{' '}
            <Link href="/join" className="text-primary hover:underline">
              Create one now
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
