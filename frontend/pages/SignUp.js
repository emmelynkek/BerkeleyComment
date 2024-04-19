import Head from "next/head";
import styles from "../styles/SignUp.module.css";
import NavBar from "../components/NavBar/NavBar";
import Signup from "../components/SignUp/SignUp";
import LogIn from "../components/LogIn/LogIn";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State to toggle forms

  const toggleForm = () => {
    setIsLoggingIn(!isLoggingIn); // Toggle between login and signup
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{isLoggingIn ? "Log In" : "Sign Up"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        <div className={styles.col}>
          <div className={styles.left}>
            <div className={styles.top}>
              <div className={styles.welcome}>Welcome to </div>
              <img src="images/berk2.png" className={styles.berkimg} />
            </div>

            <div>
              {" "}
              <img className={styles.welcomeimage} src="images/study.png" />
            </div>
          </div>
          <div className={styles.right}>
            {!isLoggingIn ? (
              <>
                <Signup />
                <p className={styles.toggleFormText}>
                  Already have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className={styles.toggleFormButton}
                  >
                    Login here
                  </button>
                </p>
              </>
            ) : (
              <>
                <LogIn />
                <p className={styles.toggleFormText}>
                  Don't have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className={styles.toggleFormButton}
                  >
                    Sign Up here
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          width: 100%;
          font-family: "Lexend Deca";
          flex: 1;
          display: flex;

          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
