import { useState } from "react";
import axios from "axios";
import styles from "./RatingCard.module.css";
import Rating from "@mui/material/Rating";

export default function RatingCard({ title, value }) {
  return (
    <div className={styles.ratingcard}>
      <div className={styles.ratingtitle}> {title}</div>

      <Rating name="read-only" value={value} size="large" readOnly />
    </div>
  );
}
