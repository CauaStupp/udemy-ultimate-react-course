import { Header } from "@/components/Header";
import styles from "./Login.module.css";
import { useState } from "react";
import Image01 from "@/assets/image01.jpg";
import Image02 from "@/assets/image02.jpg";
import Image03 from "@/assets/image03.jpg";
import { useUserContext } from "@/contexts/userContext";
import { Button } from "@/components/Button";

export function Login() {
  const [user, setUser] = useState({
    name: "",
    image: "",
  });

  const { handleLogin } = useUserContext();

  return (
    <main className={styles.container}>
      <Header />

      <section className={`fadeIn ${styles.section}`}>
        <form className={styles.form}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              placeholder="Your name or nickname..."
              value={user.name}
              onChange={({ target }) =>
                setUser({ ...user, name: target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="image">Select your image</label>
            <select
              id="image"
              value={user.image}
              onChange={({ target }) =>
                setUser({ ...user, image: target.value })
              }
              className={styles.select}
            >
              <option value="" disabled>
                Select
              </option>
              <option value={Image01}>image 01</option>
              <option value={Image02}>image 02</option>
              <option value={Image03}>image 03</option>
            </select>
          </div>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              handleLogin(user);
            }}
          >
            Login
          </Button>
        </form>
      </section>
    </main>
  );
}
