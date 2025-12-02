import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const url = new URL(req.url);
    const reference = url.searchParams.get("reference");
    const verify = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_API_SECRET_KEY}`
        }
    });

    const result = await verify.json();
    console.log(result)
    redirect("/payment");
    return NextResponse.json(result);

}