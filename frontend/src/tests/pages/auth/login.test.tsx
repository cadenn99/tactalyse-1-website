import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react"
import Login from "../../../pages/auth/login"
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import mockRouter from 'next-router-mock';

afterEach(cleanup)

/**
 * Renders the Login component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderLogin(session: Session | null | undefined) {
  render(
    <SessionProvider session={session}>
      <Login />
    </SessionProvider>
  );
};

describe ('Page', () => {
  it('should render properly', () => {

    renderLogin(null);
    expect(screen.getByRole('main')).toBeDefined();
  })

  it('should redirect when logged in as customer', () => {
    renderLogin({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(mockRouter).toMatchObject({ asPath: "/" })
  })

  it('should redirect when logged in as employee', () => {
    renderLogin({expires: "1", user: {email: "", isEmployee: true, token: "", id: ""}, accessToken: ""});
    expect(mockRouter).toMatchObject({ asPath: "/" })
  })
})

describe('loginForm', () => {
  it('should contain two entries', () => {
    renderLogin(null);
    expect(within(screen.getByTestId('email'))).toBeDefined;
    expect(within(screen.getByTestId('password'))).toBeDefined;
    expect(within(screen.getByRole('button'))).toBeDefined;
  })
})
