import { z } from 'zod'

/**
 * Schema for validating login or register requests
 * 
 */
export const authReqSchema: any = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})