import React, { useEffect, useMemo, useState } from "react";
import { Footer } from "flowbite-react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

function FooterComponent() {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", "false");
    }

    setDarkMode(localStorage.getItem("darkMode") === "true");
    if (
      localStorage.getItem("darkMode") === "true" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, []);

  const handleDarkMode = () => {
    const darkModeIsSet = localStorage.getItem("darkMode") === "true";

    if (darkModeIsSet) {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    }
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
          <Footer.Link href="#" className="text-center">
            About
          </Footer.Link>
          <Footer.Link href="#" className="text-center">
            Privacy Policy
          </Footer.Link>
          <Footer.Link href="#" className="text-center">
            Licensing
          </Footer.Link>
          <Footer.Link href="/contact" className="text-center">
            Contact
          </Footer.Link>
        </Footer.LinkGroup>
        {!darkMode ? (
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
