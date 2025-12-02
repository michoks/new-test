"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";


export default function Pay() {
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const startPayment = async () => {
        setLoading(true);

        const res = await fetch("/api/pay/initialization", { method: "POST" });
        const data = await res.json();
        console.log('pay init response', data);
        console.log(data.data.reference)
        setLoading(false);

        // handle server-side errors returned from the API route
        if (data?.error || !data?.data?.reference) {
            const msg = data?.message || (data?.error === true ? 'Payment initialization failed' : undefined) || 'Payment initialization failed';
            alert(msg);
            return;
        }

        // dynamically import Paystack to avoid SSR/bundling issues
        const mod = await import('@paystack/inline-js');
        const Paystack = (mod as any).PaystackPop ?? (mod as any).default ?? (window as any).PaystackPop;
        if (!Paystack) {
            alert('Failed to load payment library.');
            return;
        }

        const payStack = new (Paystack as any)();

        // Guard: ensure public key is provided at build time
        const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
        if (!publicKey) {
            alert('Payment public key is not configured.');
            return;
        }

        payStack.newTransaction({
            key: publicKey,
            reference: data.data.reference,
            email: user?.primaryEmailAddress?.emailAddress,
            amount: data.amount,
            onSuccess: (response: any) => {
                window.location.href = `/pay/success?reference=${response.reference}`
            },
            onCancel: () => {
                alert("Payment cancelled");
            }
        })
    }

    return (
        <div className=" pt-30 " >
            <Button onClick={startPayment}
                disabled={loading}> {loading ? "Loading..." : "Pay #5000"} </Button>
        </div>
    )
}