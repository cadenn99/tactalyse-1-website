import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import { Session } from "next-auth";

/**
 * Make sure ot remove the render after every test.
 */
afterEach(async () => {
  cleanup();
}) 

/**
 * Renders the Header component with a custom session State.
 * @param session sessionState to use during render.
 */
async function renderHeader(session: Session | null | undefined) {
  render(
    <SessionProvider session={session}>
      <Header />
    </SessionProvider>
  );
};

describe('Header', () => {
  it('should render properly', () => {
    renderHeader(null);
    expect(screen.getByRole('banner')).toBeDefined();
  })
})

describe('Logo', () => {
  it('should alwasy render', () => {
    renderHeader(null);
    expect(screen.getByRole('img')).toBeDefined();
  })
})

describe('Home button', () => {
  it('should alwasy render', () => {
    renderHeader(null);
    expect(screen.getByText('Home')).toBeDefined();
  })
})

describe('Reports button', () => {
  it('should render', () => {
    renderHeader(null);
    expect(screen.getByText('Reports')).toBeDefined();
  })

  it('should not render when not logged in', () => {
    renderHeader(null);
    expect(screen.queryByText('Account')).toBeNull();
  })
})

describe('Generate button', () => {
  it('should not render when not logged in as employee', () => {
    renderHeader(null);
    expect(screen.queryByText('Generate')).toBeNull();
  })

  it('should not render when logged in as non-employee', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.queryByText('Generate')).toBeNull();
  })

  it('should render when logged in as employee', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: true, token: "", id: ""}, accessToken: ""});
    expect(screen.getByText('Generate')).toBeDefined();
  })
})

describe('Resolve button', () => {
  it('should not render when not logged in as employee', () => {
    renderHeader(null);
    expect(screen.queryByText('Resolve Outstanding')).toBeNull();
  })

  it('should not render when logged in as non-employee', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.queryByText('Resolve Outstanding')).toBeNull();
  })

  it('should render when logged in as employee', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: true, token: "", id: ""}, accessToken: ""});
    expect(screen.getByText('Resolve Outstanding')).toBeDefined();
  })
})

describe('Login button', () => {
  it('should render when not logged in', () => {
    renderHeader(null);
    expect(screen.getByText('Sign in')).toBeDefined();
  })

  it('should not render when logged in', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.queryByText('Sign in')).toBeNull();
  })
})

describe('Register button', () => {
  it('should render when not logged in', () => {
    renderHeader(null);
    expect(screen.getByText('Register')).toBeDefined();
  })

  it('should not render when logged in', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.queryByText('Register')).toBeNull();
  })
})

describe('Sign out button', () => {
  it('should not render when not logged in', () => {
    renderHeader(null);
    expect(screen.queryByText('Sign out')).toBeNull();
  })

  it('should render when logged in', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.getByText('Sign out')).toBeDefined();
  })
})

describe('Account button', () => {
  it('should not render when not logged in', () => {
    renderHeader(null);
    expect(screen.queryByText('Account')).toBeNull();
  })

  it('should render when logged in', () => {
    renderHeader({expires: "1", user: {email: "", isEmployee: false, token: "", id: ""}, accessToken: ""});
    expect(screen.getByText('Account')).toBeDefined();
  })
})