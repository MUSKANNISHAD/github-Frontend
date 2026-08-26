import React, { useEffect, useState } from 'react';
import "./profile.css";
import Navbar from '../Navbar';
import { UnderlineNav } from '@primer/react';
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import { useAuth } from '../../authContext.jsx';


export default function Profile() {


  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });

  const {setCurrentUser}=useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/getUserProfile/${userId}`);

          console.log("response is ", response);
          console.log("response.data is ", response.data);
          setUserDetails(response.data)

        } catch (err) {
          console.log(`error while fetching profile ${err}`);
        }
      }
    }
    fetchUserDetails();
  }, []);


  return (
    <>
      <Navbar />
      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <button
        className='logout'
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/auth";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
      <Footer />
    </>
  )
}
