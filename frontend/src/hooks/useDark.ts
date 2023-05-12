import { useEffect } from "react";

/**
 * Hook fort detecting dark or light mode
 */
export const useDark = () => {
    useEffect(() => {
        if (localStorage.getItem("darkMode") === null) {
            localStorage.setItem("darkMode", "false");
        }

        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, []);
}