import { Map } from "@/components/Map";
import styles from "./MapApp.module.css";
import { AsideApp } from "@/components/AsideApp";
import { UserIcon } from "@/components/UserIcon";

export default function MapApp() {
  return (
    <main className={styles.container}>
      <UserIcon />
      <AsideApp />

      <Map />
    </main>
  );
}
