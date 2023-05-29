import React, { useContext, useEffect, useState } from "react";
import { Footer } from "flowbite-react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Link from "next/link";
import { ThemeContext } from "@/contexts/ThemeContext";

function FooterComponent() {
  const theme = useContext(ThemeContext);

  const handleDarkMode = () => {
    if (theme?.darkMode) return theme.setDarkMode(false);
    theme?.setDarkMode(true);
  };

  return (
    <Footer container={true} className="mb-4 mt-auto">
      <Footer.Copyright
        href="#"
        by="Tactalyse™"
        year={2023}
        className="text-center"
      />
      <div className="flex items-center flex-col gap-6 xs:flex-row xs:gap-6 md:gap-3 xs:justify-center mt-2">
        <Footer.LinkGroup className="gap-6 md:gap-0 flex-col xs:flex-row flex mt-2 xs:mt-0">
          <Footer.Link href="#" className="text-center" as={Link}>
            About
          </Footer.Link>
          <Footer.Link href="#" className="text-center" as={Link}>
            Privacy Policy
          </Footer.Link>
          <Footer.Link href="#" className="text-center" as={Link}>
            Licensing
          </Footer.Link>
          <Footer.Link href="/contact" className="text-center" as={Link}>
            Contact
          </Footer.Link>
        </Footer.LinkGroup>
        {!theme?.darkMode ? (
          <BsFillMoonFill
            className="text-[#8B929E] cursor-pointer"
            onClick={handleDarkMode}
          />
        ) : (
          <BsFillSunFill
            className="text-[#8B929E] cursor-pointer"
            onClick={handleDarkMode}
          />
        )}
      </div>
    </Footer>
  );
}

export default FooterComponent;
