import { z } from 'zod';
export const zodlogin=z.object({
    email:z.string().email({message:"Invalid email address"}).nonempty({message:"Email is required"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters"}).max(20,{message:"Password must be at most 20 characters"}).nonempty({message:"Password is required"}),
})
export type loginType=z.infer<typeof zodlogin>;