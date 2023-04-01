import { z } from 'zod'

export const createPaymentSchema: any = z.object({
    playerName: z.string(),
})

export const paymentCompleteReqSchema: any = z.object({
    id: z.string()
})