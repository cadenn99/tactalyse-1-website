import { vi } from 'vitest'

export const PaymentService = vi.fn(() => ({
    createPayment: vi.fn(() => ({
        id: "Payment Id",
        checkOutUrl: 'test'
    })),
    getPayment: vi.fn(() => ({
        id: "Payment Id"
    }))
}))