import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

export default function Login() {
  //3. set/update the user using the auth context
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const usercred = { email, password };

    axios
      .post("http://127.0.0.1:5000/login_user", usercred)
      .then((response) => {
        console.log("Login Successful");
        const user = { id: response.data.user_id };
        login(user);
        console.log(user);

        setMessage("Logged in successfully!");
        router.push("/courses");
      })
      .catch((error) => {
        console.error("Login failed", error.response.data.message);
        setMessage(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.title}>Log In</div>
      <div className={styles.field}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.btn}>
        Log In
      </button>
      <div className={styles.msg}>{message && <p>{message}</p>}</div>
    </form>
  );
}
