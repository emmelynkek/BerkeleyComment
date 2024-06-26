import Head from "next/head";
import styles from "../styles/Courses.module.css";
import NavBar from "../components/NavBar/NavBar";
import AddCourse from "../components/AddCourse/AddCourse";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  useEffect(() => {
    //when courses component first mounted to dom, the useefect hook is triggered.
    // empty dependency array emans that  it will run once after initial render
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("http://127.0.0.1:5000/get_courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };
  const handleCourseAdded = () => {
    //once course is added , we will refresh again
    fetchCourses();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Berkeley Comment Time - Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        <div className={styles.title}>Courses</div>

        <div className={styles.grid}>
          {courses.map((course) => (
            <div className={styles.card}>
              <Link key={course.code} href={`/course/${course._id}`}>
                <h3>{course.code} &rarr;</h3>
                <p>{course.name}</p>
              </Link>
            </div>
          ))}

          <div
            className={styles.cardaddition}
            onClick={() => setShowAddCourse(true)}
          >
            +
          </div>
        </div>
        <div>
          {" "}
          <img className={styles.line} src="/images/line2.png" />
        </div>
        <div>
          {/* <SignUp /> */}
          {showAddCourse && (
            <div className={styles.overlay}>
              <div className={styles.addCourseContainer}>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowAddCourse(false)}
                >
                  X
                </button>
                <AddCourse onCourseAdded={handleCourseAdded} />
              </div>
            </div>
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
