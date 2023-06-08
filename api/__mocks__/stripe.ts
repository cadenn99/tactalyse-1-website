import { vi } from "vitest";

class Stripe { }
export const stripe = vi.fn(() => new Stripe());
