import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import LogoImg from "@/assets/logo.png";
import type { CSSProperties } from "react";

export function Logo({ customStyle }: { customStyle?: CSSProperties }) {
  return (
    <Link to="/">
      <img
        src={LogoImg}
        alt="Logo of World Wise"
        className={styles.logo}
        style={customStyle}
      />
    </Link>
  );
}
