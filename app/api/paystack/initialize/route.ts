import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, amount } = await req.json();

    const amountInKobo = amount * 100;

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_API_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            amount: amountInKobo,
            callback_url: `http://localhost:3000/api/paystack/callback`,
        }),
    });

    const data = await res.json();
    return NextResponse.json(data);

}