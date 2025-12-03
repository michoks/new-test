import connectDB from "@/lib/connectDB";
import Post from "@/model/post.model";
import Tag from "@/model/tags.model";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        connectDB();
        const post = await Post.findOne();
        const tag1 = await Tag.create({ name: "Faita's first Tag", post: [post._id] })
        const tag2 = await Tag.create({ name: "Faita's second Tag", post: [post._id] })

        post.tags = [tag1._id, tag2._id];
        await post.save()

        const posts = await Post.findOne().populate({
            path: "author.user",
            select: "name email",
            populate: {
                path: "profile",
                select: "bios avatar"
            }
        }
        ).populate('tags', "name");

        return NextResponse.json(posts, { status: 200 })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: message }, { status: 500 })
    }
}