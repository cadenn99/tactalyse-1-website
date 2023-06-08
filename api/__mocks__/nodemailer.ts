import { vi } from "vitest";

export default {
    createTransport: vi.fn(() => ({
        sendMail: vi.fn(() => ({
            accepted: [1]
        }))
    }))
}