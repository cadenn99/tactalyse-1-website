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
    if (localStorage.getItem("darkMode") === "true") {
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
      <Footer.Copyright href="#" by="Tactalyse™" year={2023} />
      <div className="flex gap-5 items-center">
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
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
