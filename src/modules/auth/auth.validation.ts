import { z } from "zod";


const sellerCreateSchema = z.object({
    body: z.object({
        name:z.string({required_error:'name is required'}),
        email:z.string({required_error:'email is required'}),
        password: z.string({required_error:'password is required'}),
        role: z.enum(["seller"]).default("seller")
    })
})
const userCreateSchema = z.object({
    body: z.object({
        name:z.string({required_error:'name is required'}),
        email:z.string({required_error:'email is required'}),
        password: z.string({required_error:'password is required'}),
        role: z.enum(["user"]).default("user")
    })
})


export const authValidation = {
    sellerCreateSchema,
    userCreateSchema
}