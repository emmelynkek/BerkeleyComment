import Head from "next/head";
import styles from "../styles/Home.module.css";
import SignUp from "../components/SignUp/SignUp";
import NavBar from "../components/NavBar/NavBar";
import AddCourse from "../components/AddCourse/AddCourse";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Berkeley Comment Time</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        <h1 className={styles.title}>Courses</h1>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>CS198-99 &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>CS198-99 &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>CS198-99 &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>CS198-075&rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>CS198-99 &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>CS198-075&rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
        </div>
        <div>
          {/* <SignUp /> */}
          <AddCourse />
        </div>
      </main>

      <style jsx>{`
        main {
          font-family: "Lexend Deca";
          flex: 1;
          display: flex;
          padding-top: 5rem;
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
