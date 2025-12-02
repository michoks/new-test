import { z } from "zod";

export const formSchema = z.object({
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "password must be at least 8 character")
})



export type FormSchema = z.infer<typeof formSchema>;
