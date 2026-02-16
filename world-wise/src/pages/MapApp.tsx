import { Map } from "@/components/Map";
import styles from "./MapApp.module.css";
import { AsideApp } from "@/components/AsideApp";
import { UserIcon } from "@/components/UserIcon";

export function MapApp() {
  return (
    <main className={styles.container}>
      <UserIcon />
      <AsideApp />

      <Map />
    </main>
  );
}
