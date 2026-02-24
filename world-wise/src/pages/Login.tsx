import { Header } from "@/components/Header";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Image01 from "@/assets/image01.jpg";
import Image02 from "@/assets/image02.jpg";
import Image03 from "@/assets/image03.jpg";
import { useUserContext } from "@/contexts/userContext";
import { Button } from "@/components/Button";
import { UserIcon } from "@/components/UserIcon";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const { user, handleLogin } = useUserContext();

  useEffect(() => {
    user ? navigate("/app", { replace: true }) : null;
  }, []);

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
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            <label htmlFor="image">Select your image</label>
            <select
              id="image"
              value={image}
              onChange={({ target }) => setImage(target.value)}
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
              handleLogin({ id: crypto.randomUUID(), name, image });
            }}
          >
            Login
          </Button>
        </form>

        {name && image && (
          <div className={`fadeIn ${styles.preview}`}>
            <h2>Preview</h2>
            <UserIcon namePreview={name} imagePreview={image} isPreview />
          </div>
        )}
      </section>
    </main>
  );
}
