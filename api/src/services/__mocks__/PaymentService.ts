import { vi } from 'vitest'

export const PaymentService = vi.fn(() => ({
    createPayment: vi.fn(() => ({
        id: 10,
        checkOutUrl: 'test'
    })),
    getPayment: vi.fn(() => ({
        id: 10
    }))
}))