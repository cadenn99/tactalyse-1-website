import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import Home from "../../pages/index";
import { SessionProvider } from "next-auth/react";
import React from "react";
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import { Session } from "next-auth";

afterEach(cleanup)

/**
 * Renders the component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderHome(session: Session | null | undefined) {
  render(
    <SessionProvider session={session}>
      <Home />
    </SessionProvider>
  );
};

describe ('Page', () => {
  it('should render properly', () => {
    renderHome(null);
    expect(screen.getByRole('main')).toBeDefined();
  })
})

describe('discordWidget', () => {
  it('should be rendered', () => {
    renderHome(null);
    // expect(screen.getByTestId('DiscordWidget')).toBeDefined;
  })
})
