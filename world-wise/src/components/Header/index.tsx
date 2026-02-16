import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { Logo } from "../Logo";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/pricing" className={styles.link}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className={styles.link}>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={`${styles.link} cta`}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
