import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react"
import Background from "@/components/Background";

describe('Background', () => {
  it('should render', () => {
    render(<Background />);
    expect(screen.getByRole('background')).toBeDefined();
  })
})