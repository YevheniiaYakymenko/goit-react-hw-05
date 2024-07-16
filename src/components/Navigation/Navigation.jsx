import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <header>
      <nav className={css.container}>
        <NavLink to="/" className={makeNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={makeNavLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
