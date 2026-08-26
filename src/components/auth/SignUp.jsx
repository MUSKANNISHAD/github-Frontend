import React, { useEffect, useState } from 'react';
import axios from "axios";

import { PageHeader } from "@primer/react";
import { Link } from "react-router-dom";
import { Button, TextInput, Heading } from "@primer/react";
import styles from "./style.module.css";
import { useAuth } from "../../authContext.jsx";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentUser } = useAuth();


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/signUp", {
                email: email,
                password: password,
                username: username
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);
            setLoading(false);

            window.location.href = "/"

        } catch (err) {
            console.log("error is :", err);
            setLoading(false);
        }
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.logoConatiner}>
                <img className={styles.loginLogo} src='../../assets/github-mark-white.svg' alt='logo' />
            </div>

            <div className={styles.loginBoxWrapper}>
                <div className={styles.loginHeading}>
                    <div style={{ padding: "8px" }}>
                        <PageHeader>
                            <PageHeader.TitleArea variant="large">
                                <PageHeader.Title>Sign Up</PageHeader.Title>
                            </PageHeader.TitleArea>
                        </PageHeader>
                    </div>
                </div>

                <div className={styles.loginBox}>
                    <div>
                        <label className={styles.label}>Username</label>
                        <input
                            autoComplete='off'
                            name='Username'
                            id="Username"
                            className={styles.input}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div>
                        <label className={styles.label}>Email Address</label>
                        <input
                            autoComplete='off'
                            name='email'
                            id="email"
                            className={styles.input}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Password</label>
                        <input
                            autoComplete='off'
                            name='Password'
                            id="Password"
                            className={styles.input}
                            type="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={handleSignUp}
                        variant='primary'
                        disabled={loading}
                        className={styles.loginBtn}>
                        {loading ? "loading..." : "SignUp"}
                    </Button>
                </div>
                <div className={styles.passBox}>
                    <p>Already Have an Account?
                        <Link to="/auth">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
