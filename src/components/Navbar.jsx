import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">

            <Link to="/" className="brand">
                <img
                    id="github-Logo"
                    src="https://github.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="Github-logo"
                />
                <h3>GitHub</h3>
            </Link>

            <div className="nav-links">
                <Link to="/allRepo" className='All-Repository'>
                    Repositories
                </Link>
                <Link to="/repo/create" className="new-repo">
                    + New Repository
                </Link>

                <Link to="/profile" className="profile-link">
                    Profile
                </Link>
            </div>

        </nav>
    );
}