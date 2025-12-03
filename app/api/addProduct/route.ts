import connectDB from "@/lib/connectDB";
import Products from "@/model/new-user.model";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        connectDB();
        const body = await req.json();
        const { name, category } = await body;
        if (!name || !category) {
            throw new Error('all fields are required')
        }
        const newUser = await Products.create({ product_name: name, category })

        return NextResponse.json(newUser, { status: 201 });

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: message }, { status: 500 })
    }

}