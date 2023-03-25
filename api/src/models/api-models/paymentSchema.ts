import { z } from 'zod'

export const paymentCompleteReqSchema = z.object({
    id: z.string()
})