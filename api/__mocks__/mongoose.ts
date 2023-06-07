import { vi } from 'vitest'

export default {
    connect: vi.fn(() => {
        return new Promise((resolve) => resolve(null))
    }),
    model: vi.fn(() => ({
        create: vi.fn(({ email, hash }) => ({
            toJSON: vi.fn(() => ({ hash, email }))
        })),
        findOne: vi.fn(({ email }) => ({
            toJSON: vi.fn(() => ({ hash: "x", email }))
        }))
    }))
}