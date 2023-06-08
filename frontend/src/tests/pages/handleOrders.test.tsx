import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import HandleOrders from "../../pages/handleOrders";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";
import mockRouter from "next-router-mock";

afterEach(cleanup);

/**
 * Renders the Login component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderHandleOrders(session: Session | null | undefined) {
  render(
    <SessionProvider session={session}>
      <HandleOrders />
    </SessionProvider>
  );
}

let employee = {
  expires: "1",
  user: { email: "", isEmployee: false, token: "", id: "" },
  accessToken: "",
};

describe("Page", () => {
  it("should render properly", () => {
    renderHandleOrders(employee);
    expect(screen.getByRole("main")).toBeDefined();
  });

  it("should redirect when not logged in", () => {
    renderHandleOrders(null);
    expect(mockRouter).toMatchObject({ asPath: "/auth/login" });
  });

  it("should redirect when logged in as customer", () => {
    renderHandleOrders({
      expires: "1",
      user: { email: "", isEmployee: false, token: "", id: "" },
      accessToken: "",
    });
    expect(mockRouter).toMatchObject({ asPath: "/" });
  });

  it("should not redirect when logged in as employee", () => {
    renderHandleOrders(employee);
    expect(mockRouter).not.toHaveBeenCalled;
  });
});

describe("Form", () => {
  it("should render", () => {
    renderHandleOrders(employee);
    expect(screen.getByTestId("Generator"));
  });
});

describe("Orders", () => {
  it("should render", () => {
    renderHandleOrders(employee);
    expect(screen.getByTestId("OutstandingOrders")).toBeDefined;
  });
});
