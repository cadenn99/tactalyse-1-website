import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Carousel from "../../components/Carousel";
import { CarouselImage } from "../../../types/types";


afterEach(() => {
  cleanup();
})

function generateImages() {
  const foo: CarouselImage = {id:0, image:"/sampleReports/tCleverly_Midfielder.png", alt:"sampleReport1"}
  const bar: CarouselImage = {id:1, image:"/sampleReports/comparison_R.Bennett_B.Wilmot.png", alt:"sampleReport2"}
  const bar2: CarouselImage = {id:2, image:"/sampleReports/Millwal_ J._Cooper.png", alt:"sampleReport3"}
  
  return [foo, bar, bar2]
}

describe('Carsousel', () => {
  it('should render', () => {
    render(<Carousel images={generateImages()} />);
    // expect(screen.getByAltText('alt text')).toBeDefined();
  })
})


describe('Reports', () => {
  it('should be defined for all entries', () => {
    render(<Carousel images={generateImages()} />);
    expect(screen.getByAltText('sampleReport1')).toBeDefined();
    expect(screen.getByAltText('sampleReport2')).toBeDefined();
    expect(screen.getByAltText('sampleReport3')).toBeDefined();
  })

  it('should not be defined when no images are specified', () => {
    render(<Carousel images={[]} />);
    expect(screen.queryByRole('carousel')).toBeNull();
  })
})