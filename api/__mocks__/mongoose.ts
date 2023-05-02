import { vi } from 'vitest'

export default {
    connect: vi.fn(() => {
        return new Promise((resolve) => resolve(null))
    })
}