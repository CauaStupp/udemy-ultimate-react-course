import { Header } from "@/components/Header";
import Image from "@/assets/img-2.jpg";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <main className={styles.container}>
      <Header />

      <section className={`fadeIn ${styles.section}`}>
        <div className={styles.content}>
          <h1>
            Simple pricing. <br /> Just $9/month.
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            error quidem a quisquam ullam necessitatibus, iure ex doloremque
            consequatur maxime illum quaerat. Voluptas, ea accusamus? Dolor
            ducimus ab vero impedit?
          </p>
        </div>
        <div className={styles.image}>
          <img src={Image} alt="Image" className={styles.image} />
        </div>
      </section>
    </main>
  );
}
