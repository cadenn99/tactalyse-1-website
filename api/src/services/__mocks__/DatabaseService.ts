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
    findOrder: vi.fn()
}))

