"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";


export default function PayPage() {

    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    async function handlePay() {
        setLoading(true);
        const res = await fetch("/api/paystack/initialize", {
            method: 'POST',
            body: JSON.stringify({
                email: user?.primaryEmailAddress?.emailAddress,
                amount: 100,
            })
        })

        const data = await res.json();
        console.log(data);

        window.location.href = data.data.authorization_url;

        setLoading(false);
    };

    return (
        <div className="pt-30">
            <Button disabled={loading} onClick={handlePay}>
                {loading ? "loading..." : "Pay #100"}
            </Button>
        </div>
    )

}