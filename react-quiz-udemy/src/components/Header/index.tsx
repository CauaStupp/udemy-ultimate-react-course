import Logo from "../../assets/react.svg";
import styles from "./styles.module.css";

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="" className={styles.img} />

        <h1 className={styles.title}>The React Quiz</h1>
      </div>
    </div>
  );
}
