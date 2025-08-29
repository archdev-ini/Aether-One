
import { verifyTokenAndLogin } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface VerificationPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

async function VerificationStatus({ token, callbackUrl }: { token: string | undefined, callbackUrl: string | undefined }) {
    if (!token) {
        return (
            <div className="flex flex-col items-center text-center text-destructive">
                <AlertCircle className="w-16 h-16 mb-4" />
                <p>Verification token not found. Please check the link and try again.</p>
            </div>
        );
    }
    
    const result = await verifyTokenAndLogin(token);

    if (result?.success === false) {
         return (
            <div className="flex flex-col items-center text-center text-destructive">
                <AlertCircle className="w-16 h-16 mb-4" />
                <p>{result.message}</p>
                 <Button asChild variant="link">
                    <Link href="/join">Return to Sign-Up</Link>
                </Button>
            </div>
        );
    }

    // Redirect will happen after setting cookies in the action
    redirect(callbackUrl || '/profile');

    // This part will not be rendered due to the redirect, but it's a good fallback.
     return (
        <div className="flex flex-col items-center text-center text-green-600">
            <CheckCircle className="w-16 h-16 mb-4" />
            <p>Verification successful! Redirecting...</p>
        </div>
    );
}

export default function VerificationPage({ searchParams }: VerificationPageProps) {
    const token = typeof searchParams.token === 'string' ? searchParams.token : undefined;
    const callbackUrl = typeof searchParams.callbackUrl === 'string' ? searchParams.callbackUrl : undefined;


    return (
        <div className="w-full min-h-[60vh] flex items-center justify-center py-16 md:py-24">
            <Card className="max-w-md mx-auto w-full">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Activating Your Aether ID</CardTitle>
                    <CardDescription className="text-center">
                        Please wait while we verify your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                        <VerificationStatus token={token} callbackUrl={callbackUrl} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}
