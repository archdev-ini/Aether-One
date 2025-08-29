
'use client';

import {signIn} from 'next-auth/react';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {useSearchParams} from 'next/navigation';
import {Loader2} from 'lucide-react';

function GoogleIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.48 1.68-4.34 1.68-3.64 0-6.58-3-6.58-6.6s2.94-6.6 6.58-6.6c1.94 0 3.4.83 4.34 1.73l2.5-2.5C18.16 3.4 15.6 2 12.48 2c-5.74 0-10.44 4.6-10.44 10.4s4.7 10.4 10.44 10.4c5.44 0 8.38-3.72 8.38-8.5v-1.2H12.48z" />
    </svg>
  );
}


export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', {callbackUrl});
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Aether</CardTitle>
          <CardDescription>
            Sign in to access the ecosystem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
              )}
              Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
