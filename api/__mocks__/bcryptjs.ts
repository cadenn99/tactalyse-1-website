import { vi } from "vitest";

export default {
    compare: vi.fn(() => true),
    genSalt: vi.fn(() => "x"),
    hash: vi.fn(() => "x")
}