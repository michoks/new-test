import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";


export async function POST() {
    const timestamp = Math.round(Date.now() / 1000);
    const params = {
        timestamp,
        folder: 'app_user'
    };
    const signature = cloudinary.utils.api_sign_request(
        params,
        process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
        timestamp,
        signature,
        apiKey: process.env.CLOUDINARY_API_KEY!,
        folder: params.folder,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    });

}