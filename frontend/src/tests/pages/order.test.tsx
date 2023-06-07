import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import Order from "../../pages/order";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

afterEach(cleanup)

/**
 * Renders the component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderOrder() {
  render(
    <SessionProvider session={{expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""}}>
      <Order />
    </SessionProvider>
  );
};

describe ('Page', () => {
  it('should render properly', () => {
    renderOrder();
    expect(screen.getByRole('main')).toBeDefined();
  })
})

describe('sampleReports', () => {
  it('should be rendered', () => {
    renderOrder();
    expect(screen.getByTestId('exampleReports')).toBeDefined;
  })

  it('should contain multiple tabs', () => {
    renderOrder();
    const reports = within(screen.getByTestId('exampleReports'))

    expect(reports.queryAllByText(/Player ./i).length).toBeGreaterThan(1);
  })
})

describe('orderForm', () => {
  it('should be rendered', () => {
    renderOrder();
    expect(screen.getByTestId('orderForm')).toBeDefined;
  })

  it('should contain a field for Playername', () => {
    renderOrder();
    const form = within(screen.getByTestId('orderForm'));

    expect(form.getByPlaceholderText('Playername')).toBeDefined;
  })

  it('should submit on buttonpress', () => {
    renderOrder();
    const form = within(screen.getByTestId('orderForm'));
    const field = form.getByPlaceholderText('Playername');
    const button = form.getByRole('button');

    fireEvent.change(field, {
      target: { value: "L. Messi" }
    })

    userEvent.click(button);
    expect(mockRouter).toHaveBeenCalled;
  })
})
