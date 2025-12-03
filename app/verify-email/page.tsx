'use client';
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function VerifyEmailPage() {
    const { signUp, isLoaded, setActive } = useSignUp();
    const [code, setCode] = useState('');
    const [error, setError] = useState("");
    const router = useRouter();

    const handleResendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        // don't proceed until the Clerk signUp object is loaded
        if (!isLoaded) return;
        setError("");
        try {
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            });

        } catch (err: any) {
            if (err?.errors && err.errors[0]) {
                setError(err.errors[0].message)
            }
        }
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        try {
            const result = await signUp.attemptEmailAddressVerification({ code })
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });

                router.push('/')
            }

        } catch (err: any) {
            setError(err.errors ? err.errors[0].message : "Invlid code")
        }

    };


    return (
        <div>
            <form onSubmit={handleVerify} className=" pt-19 ">
                <h2>verify email</h2>
                {error && <p className=" text-red-600 ">{error} </p>}
                <input type="text" placeholder="Enter verification code" value={code} onChange={(e) => { setCode(e.target.value) }} className=" border-white border-2 w-90 text-white " />
                <button type="submit" className=" text-white bg-green-400 " >verify</button>
                {/* use type="button" so this doesn't submit the form */}
                <Button type="button" onClick={handleResendCode} >resend code</Button>

            </form>
        </div>
    )
}