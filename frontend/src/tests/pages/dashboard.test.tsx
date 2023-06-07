import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react"
import Dashboard from "../../pages/dashboard"
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import mockRouter from 'next-router-mock';

afterEach(cleanup)

/**
 * Renders the Login component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderDashboard(session: Session | null | undefined) {
  render(
    <SessionProvider session={session}>
      <Dashboard />
    </SessionProvider>
  );
};

describe ('Page', () => {
  it('should render properly', () => {

    renderDashboard({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.getByRole('main')).toBeDefined();
  })
  
  it('should redirect when not logged in', () => {
    renderDashboard(null);
    expect(mockRouter).toMatchObject({ asPath: "/auth/login" })
  })

  it('should redirect when logged in as employee', () => {
    renderDashboard({expires: "1", user: {email: "", isEmployee: true, token: "", id: ""}, accessToken: ""});
    expect(mockRouter).toMatchObject({ asPath: "/" })
  })
})

describe('orderHistory', () => {
  it('should be rendered', () => {
    renderDashboard({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.getByTestId('orderHistory')).toBeDefined;
  })
})
