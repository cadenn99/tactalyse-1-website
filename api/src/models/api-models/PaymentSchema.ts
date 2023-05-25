import { z } from 'zod'

export const createPaymentSchema: any = z.object({
    playerName: z.string(),
})

export const customerPurschaseSchema: any = z.object({
    id: z.string().or(z.number())
})

export const employeePurchaseSchema: any = z.object({
    playerName: z.string(),
    email: z.string().email()
})