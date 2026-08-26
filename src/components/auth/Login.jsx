import React, { useState } from 'react';
import axios from "axios";
import { Link, PageHeader } from "@primer/react";
import { Button } from "@primer/react";
import styles from "./style.module.css";
import { useAuth } from "../../authContext.jsx";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser} = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password
      })

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";

    } catch (err) {
      console.log("error is :", err);
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoConatiner}>
        <img className={styles.loginLogo} src="../../assets/github-mark-white.svg" alt="Logo" />
      </div>

      <div className={styles.loginBoxWrapper}>
        <div className={styles.login}>
          <div style={{ padding: "8px" }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </div>
        </div>
        <div className={styles.loginBox}>
          <div>
            <label className={styles.label}>Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div >
            <label className={styles.label}>Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className={styles.loginBtn}
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
        <div className={styles.passBox}>
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
