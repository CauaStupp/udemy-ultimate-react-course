import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "../Logo";
import styles from "./styles.module.css";

export function AsideApp() {
  return (
    <aside className={styles.aside}>
      <div className={styles.header}>
        <Logo />

        <nav className={styles.nav}>
          <NavLink to="cities">cities</NavLink>
          <NavLink to="countries">countries</NavLink>
        </nav>
      </div>

      <section className={styles.content}>
        <Outlet />
      </section>

      <footer className={styles.footer}>
        <p>© Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </aside>
  );
}
