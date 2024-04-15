// components/NavBar.js
import React from "react";
import { useRouter } from "next/router"; // Import useRouter
import Link from "next/link";
import styles from "./NavBar.module.css"; // Ensure you create a corresponding CSS file for styling

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img
          className={styles.bearimage}
          src="/images/icon.png"
          alt="Example"
        />
      </Link>
      <div className={styles.navbarcontainer}>
        <button
          className={styles.scrollbutton}
          onClick={() => router.push("/courses")}
        >
          Courses
        </button>
        <button
          className={styles.scrollbutton}
          onClick={() => router.push("/aboutus")}
        >
          About Us
        </button>

        <button
          className={styles.scrollbutton}
          onClick={() => router.push("/about")}
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
