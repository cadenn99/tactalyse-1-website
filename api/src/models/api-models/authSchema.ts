import { z } from 'zod'

/**
 * Schema for validating login or register requests
 * 
 */
export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const authSchemaTwo = z.object({
    email: z.string().email()
})