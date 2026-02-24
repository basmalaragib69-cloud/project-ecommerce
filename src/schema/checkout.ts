import { z } from 'zod';
export const checkouthoome = z.object({
    details: z.string().nonempty("this field cant be empty"),
    phone: z.string().nonempty("this field cant be empty").regex(/^01[0125][0-9]{8}$/, "Phone number must be 11 digits"),
    city: z.string().nonempty("this field cant be empty"),
})
export type checkoutType = z.infer<typeof checkouthoome>;
