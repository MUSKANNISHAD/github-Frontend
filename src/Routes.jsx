import React, { useEffect } from 'react'
import { useAuth } from './authContext';
import { useRoutes, useNavigate } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/auth/Login.jsx';
import SignUp from './components/auth/SignUp.jsx';
import Profile from './components/user/Profile.jsx';
import NewRepo from './components/repo/newRepo.jsx';
import AllRepo from './components/repo/AllRepo.jsx';
import ShowRepo from './components/repo/ShowRepo.jsx';

export default function ProjectRoutes() {

    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
            navigate("/auth");
        }

        if (userIdFromStorage && window.location.pathname == "/auth") {
            navigate("/");
        }

    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard />
        },
        {
            path: "/auth",
            element: <Login />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/repo/create",
            element: <NewRepo />
        },
        {
            path: "/allRepo",
            element: <AllRepo />
        },
        {
            path: "/showRepo",
            element: <ShowRepo />
        }
    ]);

    return element;
}

