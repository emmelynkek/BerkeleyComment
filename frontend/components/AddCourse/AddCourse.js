import { useState } from "react";
import axios from "axios";
import styles from "./AddCourse.module.css";

export default function AddCourse({ onCourseAdded }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const course = { code, name };

    axios
      .post("http://127.0.0.1:5000/add_course", course)
      .then((response) => {
        console.log("Course Added Successfully", response.data);
        setMessage("Course added successfully!");
        setCode("");
        setName("");
        onCourseAdded();
      })
      .catch((error) => {
        console.error("Failed Addition of Course", error);
        setMessage("Failed to add course.");
      });
  };

  return (
    <div className={styles.form}>
      <h2> Missing a Course? Add it!</h2>
      <form onSubmit={handleSubmit} className={styles.mainform}>
        <div className={styles.input}>
          <div>Course Code:</div>
          <input
            type="code"
            id="code "
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className={styles.input}>
          <div>Course Name:</div>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <div className={styles.message}> {message}</div>
          <button type="submit" className={styles.submitbutton}>
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
