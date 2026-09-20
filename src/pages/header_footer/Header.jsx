import useToggle from "../../hooks/useToggle.jsx";
import { useEffect } from "react";

export default function Header() {
    const [darkMode, toggleDarkMode] = useToggle(localStorage.getItem("pokedex-theme") === "dark");

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
            document.body.classList.remove("white");
        } else {
            document.body.classList.add("white");
            document.body.classList.remove("dark");
        }
        localStorage.setItem("pokedex-theme", darkMode ? "dark" : "light");

    }, [darkMode]);

    return (
        <header className="site-header">
            <a className="brand" href="/">
                <span className="brand-ball" aria-hidden="true"><span /></span>
                <span>Pokedex<span className="brand-dot">.</span></span>
            </a>
            <button className="theme-button" type="button" onClick={toggleDarkMode} aria-label="Toggle color theme">
                <span aria-hidden="true">{darkMode ? "☼" : "☾"}</span>
                {darkMode ? "Light" : "Dark"}
            </button>
        </header>
    )
}
