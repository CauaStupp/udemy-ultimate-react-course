import { Header } from "@/components/Header";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.section}>
        <form className={styles.form}>
          <div>
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="email..." />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="password..." />
          </div>
          <Link to="/app" className="cta">
            Login
          </Link>
        </form>
      </section>
    </div>
  );
}
