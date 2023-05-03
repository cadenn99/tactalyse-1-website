import React from "react";
import { Footer } from "flowbite-react";
function FooterComponent() {
  return (
    <div>
      <Footer container={true}>
        <Footer.Copyright href="#" by="Tactalyse™" year={2023} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}

export default FooterComponent;
