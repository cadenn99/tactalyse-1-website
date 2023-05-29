import React, {
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Props {
  children: ReactElement | ReactElement[];
}

interface ContextType {
  darkMode: boolean;
  setDarkMode: Function;
}

const ThemeContext = createContext<ContextType | null>(null);

function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", "false");
    }

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

    setDarkMode(localStorage.getItem("darkMode") === "true");
  }, []);

  const updateDarkMode = useCallback((value: boolean) => {
    setDarkMode(value);
    localStorage.setItem("darkMode", value.toString());
    value
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, []);

  const contextValue = useMemo(
    () => ({
      darkMode,
      setDarkMode: updateDarkMode,
    }),
    [darkMode, updateDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
