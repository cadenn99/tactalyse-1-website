import { vi } from 'vitest'

export const StripePaymentService = vi.fn(() => ({
    createPayment: vi.fn(() => ({
        id: "Payment Id",
        checkOutUrl: 'test'
    })),
    getPayment: vi.fn(() => ({
        id: "Payment Id"
    }))
}))