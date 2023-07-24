import { useEffect, useState } from "react";
import "./ThemeSwitcher.scss";


export default function ThemeSwitcher(): JSX.Element {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme)
  }, [theme])

  return (
    <div>
      <button
        className='themeSwitcher__button'
        aria-label={`Zmień na ${theme === "light" ? "dark" : "light"} mode`}
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="switch"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" 
          ? <i className="bi bi-sun"></i>
          : <i className="bi bi-moon"></i>
        }
      </button>
    </div>
  )   
}