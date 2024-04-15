import Head from "next/head";
import styles from "../../styles/Course.module.css";
import NavBar from "../../components/NavBar/NavBar";
import AddCourse from "../../components/AddCourse/AddCourse";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Course() {
  const router = useRouter();
  const { course_id } = router.query; //holds the dynamic part of url
  console.log(course_id);
  const [course, setCourse] = useState(null);
  useEffect(() => {
    if (course_id) {
      axios
        .get(`http://127.0.0.1:5000/get_course/${course_id}`)
        .then((response) => setCourse(response.data))
        .catch((error) =>
          console.error("Error fetching course details:", error)
        );
    }
  }, [course_id]); //triggered when courseid changes, to get the new details of each course

  return (
    <div className={styles.container}>
      <Head>
        <title>Course Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        <div>
          <h1>Course Details</h1>
          {course ? (
            <div>
              <h2>{course.code}</h2>
              <p>{course.name}</p>
            </div>
          ) : (
            <p>Loading course details...</p>
          )}
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
