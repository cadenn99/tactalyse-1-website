import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react"
import Register from "../../../pages/auth/register"
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import mockRouter from 'next-router-mock';

afterEach(cleanup)

/**
 * Renders the Login component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderRegister(session: Session | null | undefined) {
  render(
    <SessionProvider session={session}>
      <Register />
    </SessionProvider>
  );
};

describe ('Page', () => {
  it('should render properly', () => {

    renderRegister(null);
    expect(screen.getByRole('main')).toBeDefined();
  })

  it('should redirect when logged in as customer', () => {
    renderRegister({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(mockRouter).toMatchObject({ asPath: "/" })
  })

  it('should redirect when logged in as employee', () => {
    renderRegister({expires: "1", user: {email: "", isEmployee: true, token: "", id: ""}, accessToken: ""});
    expect(mockRouter).toMatchObject({ asPath: "/" })
  })
})

describe('loginForm', () => {
  it('should contain two entries', () => {
    renderRegister(null);
    expect(within(screen.getByTestId('email'))).toBeDefined;
    expect(within(screen.getByTestId('password'))).toBeDefined;
    expect(within(screen.getByRole('button'))).toBeDefined;
  })
})
