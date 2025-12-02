import { z } from 'zod';

export const profileFormSchema = z.object({
    firstName: z.string().min(3, "name must be 3 characters at least"),
    lastName: z.string().min(3, "name must be 3 characters at least"),
})


export type ProfileFormSchema = z.infer<typeof profileFormSchema>