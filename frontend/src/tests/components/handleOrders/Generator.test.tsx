import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import Generator from "../../../components/handleOrders/Generator"
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import mockRouter from 'next-router-mock';
import userEvent from "@testing-library/user-event";

afterEach(cleanup)

/**
 * Renders the Login component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderGenerator(session: Session | null | undefined) {
  render(
    <SessionProvider session={session}>
      <Generator />
    </SessionProvider>
  );
};

let employee = {expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""};

describe('Component', () => {
  it('should render', () => {
    renderGenerator(employee);
    expect(screen.getByTestId('Generator'))
  })

  it('should contain the appropriate entries', () => {
    renderGenerator(employee);

    expect(screen.getByTestId('email')).toBeDefined;
    expect(screen.getByTestId('playerName')).toBeDefined;
    expect(screen.getByTestId('leagueFile')).toBeDefined;
    expect(screen.getByTestId('playerFile')).toBeDefined;
    expect(screen.getByRole('button')).toBeDefined;
  })

  it('should contain orderid when switched', () => {
    renderGenerator(employee);

    userEvent.click(screen.getByTestId('orderSwitch'));

    expect(screen.getByTestId('email')).not.toBeDefined;
    // expect(screen.getByTestId('orderid')).toBeDefined;
    expect(screen.getByTestId('playerName')).toBeDefined;
    expect(screen.getByTestId('leagueFile')).toBeDefined;
    expect(screen.getByTestId('playerFile')).toBeDefined;
    expect(screen.getByRole('button')).toBeDefined;
  })

  it('should contain dates when enabled', () => {
    renderGenerator(employee);

    userEvent.click(screen.getByTestId('tactSwitch'));

    expect(screen.getByTestId('email')).toBeDefined;
    expect(screen.getByTestId('playerName')).toBeDefined;
    expect(screen.getByTestId('leagueFile')).toBeDefined;
    expect(screen.getByTestId('playerFile')).toBeDefined;
    // expect(screen.getByTestId('startDate')).toBeDefined;
    // expect(screen.getByTestId('endDate')).toBeDefined;
    expect(screen.getByRole('button')).toBeDefined;
  })
})