import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { URLSearchParams } from "url";
import connectDB from "@/lib/connectDB";
import Products from "@/model/new-user.model";
import Post from "@/model/post.model";
import User from "@/model/user.model";

export const users = [
    { id: 1, name: "michael", class: "primary 4", age: "9" },
    { id: 2, name: "michael", class: "primary 4", age: "9" },
    { id: 3, name: "michael", class: "primary 4", age: "9" },
    { id: 4, name: "michael", class: "primary 4", age: "9" },
    { id: 5, name: "michael", class: "primary 4", age: "9" },
    { id: 6, name: "michael", class: "primary 4", age: "9" },
    { id: 7, name: "michael", class: "primary 4", age: "9" },
    { id: 8, name: "michael", class: "primary 4", age: "9" }

];

export async function GET(req: Request) {
    try {
        connectDB()
        const products = await Products.find();
        return NextResponse.json({ products }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }

    return NextResponse.json(users, { status: 200 });
}

export async function POST(req: Request) {
    try {
        connectDB();
        const user = await User.findOne();

        const post = await Post.create({
            title: "scholarship",
            content: " free education awarded to an individual ",
            author: { user: user._id }
        });
        const posts = await Post.find().populate("author.user", "name email");
        return NextResponse.json({ user, post, posts }, { status: 201 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    };
}