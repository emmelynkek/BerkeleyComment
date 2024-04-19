import { useState } from "react";
import axios from "axios";
import styles from "./AddReview.module.css";
import Rating from "@mui/material/Rating";
import Link from "next/link";

export default function AddReview({
  courseId,
  onBackClick,
  onReviewAdded,
  userId,
}) {
  const [difficulty, setDifficulty] = useState(0);
  const [workload, setWorkload] = useState(0);
  const [support, setSupport] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [information, setInformation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const review = {
      difficulty,
      workload,
      support,
      engagement,
      information,
      courseid: courseId,
      userid: userId,
    };
    console.log(review);

    axios
      .post("http://127.0.0.1:5000/add_review", review)
      .then((response) => {
        console.log("Review Added Successfully", response.data);
        setMessage("Review added successfully!");
        setDifficulty(0);
        setWorkload(0);
        setSupport(0);
        setEngagement(0);
        setInformation("");
        onReviewAdded();
      })
      .catch((error) => {
        console.error("Failed Addition of Review", error);
        setMessage("Failed to add review.");
      });
  };

  //onclick, it will trigger onbackclick and will set setreviewfunction to be false in the parent function

  return (
    <div className={styles.form}>
      <div className={styles.top}>
        <Link href={`/course/${courseId}`} passHref>
          <button className={styles.backButton} onClick={onBackClick}>
            <img src="/images/back.png" alt="Back" width={24} height={24} />
          </button>
        </Link>

        <div className={styles.title}>Add Review:</div>
      </div>

      <form onSubmit={handleSubmit} className={styles.mainform}>
        <div className={styles.twocolumns}>
          <div className={styles.firstcol}>
            <div className={styles.field}>Difficulty:</div>
            <div className={styles.field}>Workload:</div>
            <div className={styles.field}> Support:</div>
            <div className={styles.field}> Engagement:</div>
          </div>

          <div className={styles.secondcol}>
            <Rating
              name="difficulty"
              value={difficulty}
              onChange={(event, newValue) => setDifficulty(newValue)}
              className={styles.ratingfield}
              size="large"
            />
            <Rating
              name="workload"
              value={workload}
              onChange={(event, newValue) => setWorkload(newValue)}
              className={styles.ratingfield}
              size="large"
            />
            <Rating
              name="support"
              value={support}
              onChange={(event, newValue) => setSupport(newValue)}
              className={styles.ratingfield}
              size="large"
            />

            <Rating
              name="engagement"
              value={engagement}
              onChange={(event, newValue) => setEngagement(newValue)}
              className={styles.ratingfield}
              size="large"
            />
          </div>
        </div>

        <div className={styles.input}>
          <textarea
            type="information"
            id="information"
            value={information}
            onChange={(e) => setInformation(e.target.value)}
            required
            placeholder="Share your experience"
            rows="4"
            cols="50"
          />
        </div>

        <div className={styles.message}> {message}</div>
        <div className={styles.buttons}>
          <Link href={`/course/${courseId}`} passHref>
            <button className={styles.btn} onClick={onBackClick}>
              Cancel
            </button>
          </Link>

          <button type="submit" className={styles.btn}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
