import { z } from "zod";

export const postFormSchema = z.object({
    name: z.string().min(5, "name must be more than 5 charater"),
    class: z.string().refine((val) => /^primary/.test(val.trim().toLowerCase()), { message: "field must begin with primary" }),
    age: z.string().refine((val) => /[0-9]/.test(val)).refine((val) => Number(val) < 18, { message: "must be less than 18" })
})

export type PostFormSchema = z.infer<typeof postFormSchema>;