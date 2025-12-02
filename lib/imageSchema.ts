import { z } from "zod";

export const ImageSchema = z.object({
    file: z.any().refine((file) => file && !["image/jpg", "image/png", "image/webp", "image/jpeg"].includes(file?.type), "only jpg, png, jpeg, and webp allowed")
        .refine((file) => file?.length < 1, "Please select a file.")
    //.refine((file) => file && file?.size > 3 * 1024 * 1024, "image is too large")
});

export type imageSchema = z.infer<typeof ImageSchema>



