import { z } from "zod";


const storeCreateSchema = z.object({
    body: z.object({
        name:z.string({required_error:'store name is required'}),
        description:z.string({required_error:'description is required'}),
    })
})



export const sellerValidation = {
    storeCreateSchema
}