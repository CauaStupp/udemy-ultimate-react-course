import { Header } from "@/components/Header";
import Image from "@/assets/img-1.jpg";
import styles from "./Product.module.css";

export function Product() {
  return (
    <main className={styles.container}>
      <Header />

      <section className={`fadeIn ${styles.section}`}>
        <div className={styles.image}>
          <img src={Image} alt="Image" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h1>About WorldWide.</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            error quidem a quisquam ullam necessitatibus, iure ex doloremque
            consequatur maxime illum quaerat.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ratione
            nemo, eos, consectetur vitae rerum velit ducimus possimus atque,
            quisquam.
          </p>
        </div>
      </section>
    </main>
  );
}
