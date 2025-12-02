"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageSchema, imageSchema } from "@/lib/imageSchema";
import axios from "axios";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";

type imageType = {
    file: File
}
export default function upLoadImage() {
    const form = useForm<imageSchema>({
        defaultValues: {
            file: undefined
        }
    });

    const [preview, setPreview] = useState<any>();
    const [imageFile, setImageFile] = useState<File>()
    const [filesize, setFileSize] = useState<String>();
    const [fileType, setFileType] = useState<String>("");
    const [fileLength, setFileLength] = useState<String>();
    const [error, setError] = useState<String>()

    const validation = async (file: any) => {

        console.log("file", file.type)
        try {
            if (!["image/jpg", "image/png", "image/webp", "image/jpeg"].includes(file?.type)) {
                setFileType("only jpg, png, jpeg, and webp allowed")
                throw new Error("file Type is not allowed");
            }

            if (file?.size > 3 * 1024 * 1024) {
                setFileSize("file size is greater than 3MB");
                throw new Error(" file size is huge ");
            }

            if (file?.Length >= 1) {
                setFileLength("upload one file at a time");
                throw new Error(" uploaded more than a file ")
            }

        } catch (err: any) {
            console.error(err)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("value")
        try {
            if (!imageFile) {
                throw new Error("no file selected")
            }
            const validate = validation(imageFile)

            const formData = new FormData();
            formData.append("image", imageFile);

            const res = await fetch("/api/cloudinaryPost", {
                method: "POST",
                body: formData
            }
            );
            console.log(res)

        } catch (err: any) {
            setError("uploading image failed")
            console.log("uploading image failed")
        }

    }

    const handlePreview = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.currentTarget?.files?.[0]
        if (!files) {
            throw new Error("upload a file")
        }
        setImageFile(files);
        setPreview(URL.createObjectURL(files) as any);
        form.setValue("file", imageFile)
    }

    const handleDropPreview = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.currentTarget?.files?.[0]
        if (!files) {
            throw new Error("file upload filed")
        }
        setImageFile(files);
        setPreview(URL.createObjectURL(files));
        form.setValue("file", imageFile)
    }

    return (<>
        <div className=" pt-30 ">
            {error && <p className=" text-red-400 "> {error} </p>}
            {/*   <Form {...form}>
                <form onSubmit={form.handleSubmit(e)} >
                    <FormField name="file" control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    image
                                </FormLabel>
                                <FormControl className=" border-white ">

                                    <Input type="file" accept="image/*"  {...field} onDragEnter={(e) => handleDropPreview
                                        (e)} onChange={(e) => handlePreview(e)} />

                                </FormControl>

                            </FormItem>
                        )} />

                    {fileType && <p className=" text-red-400 "> {fileType} </p>}
                    {fileLength && <p className=" text-red-400 "> {fileLength} </p>}
                    {filesize && <p className=" text-red-400 "> {filesize} </p>}

                    <Button disabled={!preview} type="submit" className=" disabled:bg-blue-500/70 text-white flex gap-2 "> <span>upload</span> {form.formState.isSubmitting && <span>submitting</span>} </Button>
                </form>
            </Form> */}

            <form onSubmit={(e) => onSubmit(e)}>
                <input type="file" onChange={(e) => handlePreview(e)} onDrop={(e) => handleDropPreview(e)} className=" w-full border-1 border-white " />
                <Button type="submit"> upload </Button>
                {fileType && <p className=" text-red-400 "> {fileType} </p>}
                {fileLength && <p className=" text-red-400 "> {fileLength} </p>}
                {filesize && <p className=" text-red-400 "> {filesize} </p>}
            </form>

            {preview && <Image
                src={preview}
                alt="preview image"
                width="450"
                height="380"
                className=" border-white border-1 "
            />}

        </div>
    </>)
}