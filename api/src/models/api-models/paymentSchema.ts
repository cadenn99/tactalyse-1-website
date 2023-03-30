import { z } from 'zod'

export const createPaymentSchema = z.object({
    playerName: z.string(),
})

export const paymentCompleteReqSchema = z.object({
    id: z.string()
})