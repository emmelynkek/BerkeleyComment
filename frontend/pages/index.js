import Head from "next/head";
import styles from "../styles/Home.module.css";
import SignUp from "../components/SignUp/SignUp";
import NavBar from "../components/NavBar/NavBar";
import AddCourse from "../components/AddCourse/AddCourse";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        <div className={styles.mainBackground}>
          <div className={styles.overlay}> </div>

          <div className={styles.titleContainer}>
            <img className={styles.berkimg} src="/images/berk.png" />
            <div className={styles.desc}>
              A Platform for you to comment on berkeley courses. <br />
              Made by Berkeley Students, for Berkeley Students.
            </div>

            <div className={styles.explore}>
              <button onClick={() => router.push("/courses")}>
                Explore Courses &rarr;
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          font-family: "Lexend Deca";
          width: 100%;
          height: 100%;
          flex: 1;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap");
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
// export default function Home() {
//   const router = useRouter();
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Berkeley Comment Time</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <NavBar />

//       <main>
//         <div className={styles.mainBackground}>
//           <img className={styles.berkimg} src="/images/berk.png" />{" "}
//         </div>
//         <div className={styles.desc}>
//           {" "}
//           A Platform for you to comment on berkeley courses.
//           <br />
//           Made by Berkeley Students, for Berkeley Students.
//         </div>
//         <div className={styles.explore}>
//           {" "}
//           <button onClick={() => router.push("/courses")}>
//             Explore Courses &rarr;
//           </button>
//         </div>
//       </main>

//       <style jsx>{`
//         main {
//           font-family: "Lexend Deca";

//           display: flex;
//           padding-top: 20rem;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }
//       `}</style>

//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//             Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
//             sans-serif;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </div>
//   );
// }
