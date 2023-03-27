import { vi } from 'vitest'

export default {
    verify: vi.fn(() => ({
        email: 'test@test.com',
        isEmployee: false,
        _id: '1'
    })),
    sign: vi.fn(() => "my-token"),
    decode: vi.fn(() => ({
        email: 'test@test.com',
        isEmployee: false,
        _id: '1'
    }))
}