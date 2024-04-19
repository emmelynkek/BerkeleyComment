import axios from "axios";
import Avatar from "@mui/material/Avatar";
import styles from "./ReviewCard.module.css";
import { useEffect, useState } from "react";

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
export default function ReviewCard({
  reviewText,
  difficulty,
  workload,
  support,
  engagement,
  userId,
}) {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(""); // State for user's name
  // const [src, setSrc] = useState(""); // State for user's name
  // const [imageSrc, setImageSrc] = useState(""); // State for user's image source
  console.log("reviewcard user id.");
  console.log(userId);

  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/get_user/${userId}`
        );
        console.log(response.data);
        const username = response.data;
        // const imageName = response.data.profile_image;
        setName(username);

        // setSrc(`http://127.0.0.1:5000/get_file/${imageName}`);

        // setImageSrc(`data:image/jpeg;base64,${response.data.profile_image}`);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Fallbacks or default values
        setName("Anonymous");
        // setImageSrc("/path/to/default/avatar.jpg"); // Update this path as needed
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, []);

  // console.log("name");

  // console.log(name);
  // console.log("src");
  // console.log(src);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const avatarLetter = name ? name.charAt(0).toUpperCase() : "A";
  const avatarColor = stringToColor(name);

  return (
    <div className={`${styles.reviewcard} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.reviewheader}>
        <Avatar alt={name} sx={{ bgcolor: avatarColor, width: 56, height: 56 }}>
          {avatarLetter}
        </Avatar>
        <div className={styles.name}>{name || "Anonymous"}</div>
      </div>
      <div
        className={expanded ? styles.experienceexpanded : styles.experience}
        style={{ maxHeight: expanded ? "none" : "4em" }}
      >
        {reviewText}
      </div>
      {expanded && (
        <div className={styles.ratings}>
          <br />
          Difficulty: {difficulty}/5
          <br />
          Workload: {workload}/5
          <br />
          Support: {support}/5
          <br />
          Engagament: {engagement}/5
        </div>
      )}
      <div className={styles.readmore}>
        <button onClick={toggleExpand}>
          {expanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}
