import { Header } from "@/components/Header";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className={styles.container}>
      <Header />
      <div className={`fadeIn ${styles.content}`}>
        <h1 className={styles.title}>
          You travel the world. <br />
          WorldWise keeps track of your adventures.
        </h1>
        <p className={styles.paragraph}>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </p>
        <Link to="/login" className="cta">
          start tracking now
        </Link>
      </div>
    </main>
  );
}
