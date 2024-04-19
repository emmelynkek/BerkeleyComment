import { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const user = { email, password };
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    if (file) {
      formData.append("image", file);
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    axios
      .post("http://127.0.0.1:5000/create_user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Signup Successful", response.data);
        setMessage("Signup Successful! Log in now!");
        // Handle further actions like redirecting to another page or showing a success message
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Conflict response indicates the user already exists
          setMessage("User already has an account, please login.");
        } else {
          setMessage("Signup failed.");
        }
        console.error("Signup failed", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.title}>Sign Up</div>
      <div className={styles.field}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username" // Added placeholder
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email" // Added placeholder
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password" // Added placeholder
        />
      </div>
      <div>
        <button type="submit" className={styles.btn}>
          Sign Up
        </button>
      </div>
      <div className={styles.msg}>{message && <p>{message}</p>}</div>
    </form>
  );
}
