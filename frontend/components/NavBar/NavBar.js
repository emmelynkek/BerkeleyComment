// components/NavBar.js
import React from "react";
import { useRouter } from "next/router"; // Import useRouter
import Link from "next/link";
import styles from "./NavBar.module.css"; // Ensure you create a corresponding CSS file for styling
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img className={styles.berkimage} src="/images/berk.png" />
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

        {!user ? (
          <button
            className={styles.scrollbutton}
            onClick={() => router.push("/SignUp")}
          >
            Sign In
          </button>
        ) : (
          <button className={styles.scrollbutton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
