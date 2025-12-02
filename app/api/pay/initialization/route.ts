import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const user = await currentUser();

        const res = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user?.primaryEmailAddress?.emailAddress,
                amount: 30000,
            })
        });

        const data = await res.json()


        if (!res.ok) {
            const message = (data && (data.message || data.error)) || 'Failed to initialize payment with Paystack';
            return NextResponse.json({ error: true, message }, { status: res.status });
        }

        console.log('paystack initialize response', res.status, data);

        // return Paystack response directly so client receives the expected shape
        return NextResponse.json({ ...data, email: user?.primaryEmailAddress?.emailAddress, amount: 30000 });

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: "failed to initialize payment" }, { status: 500 });
    }
};
