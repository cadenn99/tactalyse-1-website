import { z } from 'zod'

/**
 * Schema for validating login or register requests
 * 
 */
export const authReqSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const authResSchema = z.object({
    email: z.string().email()
})