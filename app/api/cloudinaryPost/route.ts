import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import Image from "@/model/image.model";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";


export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const formData = await req.formData();
        const file = formData.get("image");

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "no file found" }, { status: 400 })
        }

        console.log("file", file)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(new Uint8Array(bytes))

        if (!buffer) {
            return NextResponse.json({ error: "no file found" }, { status: 400 })
        }

        return new Promise((resolve) => {
            const upLoadRes = cloudinary.uploader.upload_stream(
                { folder: "my_app_home" },
                async (error, result) => {
                    if (error || !result) {
                        resolve(NextResponse.json({ error }, { status: 500 }));
                        return;
                    }
                    const saved = await Image.create({
                        publicId: result.public_id,
                        url: result.secure_url,
                        width: result.width,
                        height: result.height,
                        format: result.format,
                    });

                    resolve(NextResponse.json({ image: saved }, { status: 200 }));
                }
            );

            Readable.from(buffer).pipe(upLoadRes);
            console.log(buffer)
        });



    } catch (err: unknown) {
        console.log("error", err)
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: message }, { status: 500 })
    }

}

