import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import Login from "../../../pages/auth/login"
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import { Router } from "next/router";

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

    expect(screen.getByTitle('Home | Tactalyse')).toBeDefined;
  })
})
