import { Link, NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../../assets/logo.png";

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="Logo of World Wise" className={styles.logo} />
      </Link>

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
            <NavLink to="/login" className={styles.link}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
