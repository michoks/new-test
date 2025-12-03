"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"


export default function CloudinaryDirectUpload() {
    const form = useForm()
    const [error, setError] = useState<{ fileType?: string, fileSize?: string, fileLength?: string }>({})
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState<File>()

    const validation = async (file: any) => {
        console.log("file", file.type)
        try {
            if (!file.type.startsWith("image") || !["image/jpg", "image/png", "image/webp", "image/jpeg"].includes(file?.type)) {
                error.fileType = "only jpg, png, jpeg, and webp allowed";
                throw new Error("file Type is not allowed");
            }

            if (file?.size > 3 * 1024 * 1024) {
                error.fileSize = "file size is greater than 3MB";
                throw new Error(" file size is huge ");
            }

            if (file?.Length >= 1) {
                error.fileLength = "upload one file at a time";
                throw new Error(" uploaded more than a file ")
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.log(message)
            return err;
        }
    }

    const onSubmit = async () => {
        setError({});
        const validate = validation(image)

        if (!validate) return;

        const signRes = await fetch("/api/cloudinaryDirectUpload", {
            method: 'POST',
        });

        const { timestamp, signature,
            apiKey, folder, cloudName,
        } = await signRes.json();

        const formData = new FormData();
        formData.append("file", image as any);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: "POST",
            body: formData,
        })

        const data = await cloudinaryRes.json()
        console.log(data)
    }

    const handleImagePreview = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.currentTarget.files
        if (!file) {
            return { error: "select a file" }
        }
        setPreview(URL.createObjectURL(file[0] as File));
        setImage(file[0] as File)
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" pt-20 ">
                <input type="file" accept="image/*"  {...form.register("file")} onChange={(e) => handleImagePreview(e)}
                    className=" w-full border-1 border-white " />
                {form.formState.errors?.file && <p className=" text-red-400 " > {form.formState.errors?.file.message as string} </p>}
                <Button type="submit" disabled={!preview} className=" disabled:bg-blue-400/50 " > upload image </Button>
                {form.formState.isSubmitting && <p className=" text-white " > submitting </p>}
            </form>

            {preview && <Image src={preview} width="640" height="360" alt="image preview" />}

        </div>
    )
}