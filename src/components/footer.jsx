import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">
                    <img
                        src="https://github.com/images/modules/logos_page/GitHub-Mark.png"
                        alt="GitHub"
                    />

                    <span>© 2026 GitHub Clone</span>
                </div>


                <div className="footer-links">

                    <a href="#">Terms</a>

                    <a href="#">Privacy</a>

                    <a href="#">Security</a>

                    <a href="#">Status</a>

                    <a href="#">Documentation</a>

                    <a href="#">Contact</a>

                    <a href="#">About</a>

                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>

                </div>

            </div>

        </footer>
    );
}