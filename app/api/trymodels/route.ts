import connectDB from "@/lib/connectDB";
import Profile from "@/model/profile.model";
import User from "@/model/user.model";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        connectDB();
        const user = await User.create({
            name: "Cidera", email: "Ch394matim3m@gmail.com"
        });

        const profile = await Profile.create({
            bios: "Nurse", avatar: "nurse.png",
            user: user._id
        });

        user.profile = profile._id;
        await user.save();
        const viewUser = await User.findOne().populate("profile", "bios avatar")
        return NextResponse.json({ user, profile, viewUser }, { status: 201 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}