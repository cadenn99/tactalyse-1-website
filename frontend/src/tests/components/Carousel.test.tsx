import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Carousel from "../../components/Carousel";
import { Session } from "next-auth";

describe('Carsousel', () => {
  it('should render', () => {
    render(<Carousel images={[{id: 0, image: "/sampleReports/tCleverly_Midfielder.png", alt: "alt text"}]} />);
    expect(screen.getByAltText('alt text')).toBeDefined();
  })
})