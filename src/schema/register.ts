import { z } from 'zod';
export const zodvalue=z.object({
    name:z.string().min(3,{message:"Name must be at least 3 characters"}).max(30,{message:"Name must be at most 30 characters"}).nonempty({message:"Name is required"}),
    email:z.string().email({message:"Invalid email address"}).nonempty({message:"Email is required"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters"}).max(20,{message:"Password must be at most 20 characters"}).nonempty({message:"Password is required"}),
    rePassword:z.string().nonempty({message:"Please confirm your password"}),
    phone:z.string().regex(/^01[0125][0-9]{8}$/,"egyption number") ,
}).refine((data)=>data.password===data.rePassword,{
    error:"passwords and rePassword must be the same",
    path:["rePassword"]
})
export type RegisterType=z.infer<typeof zodvalue>;