import Head from "next/head";
import styles from "../../styles/Course.module.css";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import RatingCard from "../../components/RatingCard/RatingCard";
import AddReview from "../../components/AddReview/AddReview";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

export default function Course() {
  //4. get user context
  const { user } = useAuth();
  console.log("hi user");
  console.log(user);
  const router = useRouter();
  const { course_id } = router.query; //holds the dynamic part of url
  console.log("hi", course_id);
  const [course, setCourse] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (course_id) {
      fetchCourseDetails();
      fetchReviews();
    }
  }, [course_id]);

  const fetchCourseDetails = () => {
    axios
      .get(`http://127.0.0.1:5000/get_course/${course_id}`)
      .then((response) => setCourse(response.data))
      .catch((error) => console.error("Error fetching course details:", error));
  };

  const fetchReviews = () => {
    axios
      .get(`http://127.0.0.1:5000/get_reviews/${course_id}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  const handleAddReviewClick = () => {
    if (!user) {
      router.push("/SignUp");
    } else {
      setShowReviewForm(true);
    }
  };

  const handleBackClick = () => {
    setShowReviewForm(false);
  };

  const handleReviewAdded = () => {
    fetchReviews(); // Refresh reviews when a new review is added
  };

  const [averageRatings, setAverageRatings] = useState({
    difficulty: 0,
    workload: 0,
    support: 0,
    engagement: 0,
  });

  useEffect(() => {
    // Calculate averages when reviews are fetched
    if (reviews.length) {
      let totalDifficulty = 0;
      let totalWorkload = 0;
      let totalSupport = 0;
      let totalEngagement = 0;

      reviews.forEach((review) => {
        totalDifficulty += review.difficulty;
        totalWorkload += review.workload;
        totalSupport += review.support;
        totalEngagement += review.engagement;
      });

      setAverageRatings({
        difficulty: (totalDifficulty / reviews.length).toFixed(1),
        workload: (totalWorkload / reviews.length).toFixed(1),
        support: (totalSupport / reviews.length).toFixed(1),
        engagement: (totalEngagement / reviews.length).toFixed(1),
      });
    } else {
      // If no reviews, set averages to 0
      setAverageRatings({
        difficulty: 0,
        workload: 0,
        support: 0,
        engagement: 0,
      });
    }
  }, [reviews]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Course Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main>
        {course ? (
          <div className={styles.course}>
            <div className={styles.heading}>
              <div className={styles.title}>{course.code}</div>
              <div>{course.name}</div>
            </div>

            <div className={styles.body}>
              <div className={styles.reviews}>
                <div className={styles.header}>
                  <div className={styles.bigtitle}> Reviews: </div>
                  <button
                    className={styles.addreview}
                    onClick={handleAddReviewClick}
                  >
                    {" "}
                    Add Review{" "}
                  </button>
                </div>

                <div className={styles.reviewsection}>
                  {showReviewForm ? (
                    <AddReview
                      courseId={course_id}
                      onBackClick={handleBackClick}
                      onReviewAdded={handleReviewAdded}
                      userId={user ? user.id : null} // Passing user id to AddReview
                    />
                  ) : reviews.length ? (
                    reviews.map((review) => (
                      <ReviewCard
                        key={review._id}
                        reviewText={review.information}
                        difficulty={review.difficulty}
                        workload={review.workload}
                        support={review.support}
                        engagement={review.engagement}
                        userId={review.user_id}
                      />
                    ))
                  ) : (
                    <p className={styles.reviewmsg}>Uh Oh! No reviews yet.</p>
                  )}
                </div>
              </div>

              <div className={styles.overview}>
                <div className={styles.about}>
                  <div className={styles.smalltitle}>About Course: </div>
                  <div className={styles.aboutcourse}>{course.info}</div>
                </div>

                <div className={styles.ratings}>
                  <div className={styles.smalltitle}>Ratings: </div>
                  <RatingCard
                    value={averageRatings.difficulty}
                    title={"Difficulty"}
                  />
                  <RatingCard
                    value={averageRatings.workload}
                    title={"Workload"}
                  />
                  <RatingCard
                    value={averageRatings.support}
                    title={"Support"}
                  />
                  <RatingCard
                    value={averageRatings.engagement}
                    title={"Engagement"}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Course Not Found 404.</p>
        )}
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
