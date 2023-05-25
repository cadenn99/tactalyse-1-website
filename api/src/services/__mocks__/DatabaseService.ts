import { vi, test, expect } from 'vitest'

export const DatabaseService = vi.fn(() => ({
    createUser: vi.fn(() => ({
        user: 'Some fake user',
        token: "c"
    })),
    connect: vi.fn(),
    loginUser: vi.fn(() => ({
        user: 'Some fake user',
        token: "c"
    })),
    createOrder: vi.fn(),
    findOrder: vi.fn(() => ({
        _id: '1'
    })),
    completePayment: vi.fn(),
    findUserByOrder: vi.fn(() => ({
        email: "test@test.com"
    })),
    completeOrder: vi.fn(),
    findUserOrderHistory: vi.fn(),
    findAllUnfulfilledOrders: vi.fn()
}))

