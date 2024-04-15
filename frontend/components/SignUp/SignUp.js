import { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { email, password };

    axios
      .post("http://127.0.0.1:5000/create_user", user)
      .then((response) => {
        console.log("Signup Successful", response.data);
        // Handle further actions like redirecting to another page or showing a success message
      })
      .catch((error) => {
        console.error("Signup failed", error);
        // Handle errors here, such as displaying error messages
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
