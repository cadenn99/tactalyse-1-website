import { z } from 'zod'

export const paymentCompleteReqSchema = z.object({
    id: z.number().or(z.string())
})