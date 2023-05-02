import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react"
import Home from "../../pages"
import { SessionProvider } from "next-auth/react";

describe ('Home', () => {
  it('should render properly', () => {
    
    render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );
    expect(screen.getByRole('main')).toBeDefined();
  })
})

//todo: write tests for this when we've implemented the new figma design