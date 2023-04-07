import { vi } from "vitest"

export const MailerService = vi.fn(() => ({
    sendEmail: vi.fn()
}))
