import { vi } from 'vitest'

export default {
    verify: vi.fn(() => ({
        email: 'test@test.com',
        isEmployee: false,
        _id: 'Document Id'
    })),
    sign: vi.fn(() => "my-token"),
    decode: vi.fn(() => ({
        email: 'test@test.com',
        isEmployee: false,
        _id: 'Document Id'
    }))
}

