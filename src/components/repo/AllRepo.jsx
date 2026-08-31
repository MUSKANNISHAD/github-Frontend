import React, { useEffect, useState } from 'react';
import "./allRepo.css";
import Navbar from '../Navbar';
import Footer from '../footer';
import axios from 'axios';
import { Button } from '@primer/react';
import { useNavigate } from 'react-router-dom';
import clientServer from '../../clientServer.js';


export default function AllRepo() {

  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchRepositories = async () => {
      try {
        const repositories = await clientServer.get(`/repo/FetchRepositoryById/${userId}`);
        const data = await repositories.json();

        // console.log(data.Repository);
        setRepositories(data.Repository);
      } catch (err) {
        console.log("error while fetching repo is  :", err);
      }
    }

    fetchRepositories();
  }, [])

  useEffect(() => {

    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }

  }, [searchQuery, repositories]);


  // const handledeleteRepo = async () => {
  //   const userId = localStorage.getItem("userId");
  //   try {
  //     const deletedrepo = await fetch(`http://localhost:5000/repo/deleteRepoById/${userId}`);

  //     console.log(deletedrepo.json());
  //   } catch (err) {
  //     console.log(`error while deleting repo ${err}`);
  //   }
  // }

  return (
    <>
      <Navbar />
      <main className="dashboard-main">

        <div className="section-header">

          <div>
            <h3>Your Repositories</h3>
            <p className="section-subtitle">
              Manage and explore your repositories
            </p>
          </div>

          <span className="repo-count">
            {repositories.length}
          </span>

        </div>


        {/* Search */}
        <div className="search-container">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            value={searchQuery}
            placeholder="Search repositories..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />

        </div>


        {/* Repository cards */}
        <div className="repository-list">

          {searchResults.map((repo) => {

            return (
              <div 
                className="repo-card own-repo-card" key={repo._id}>

                <div className="repo-card-header">

                  <div className="repo-icon">
                    {repo.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4 >{repo.name}</h4>

                    <span className="visibility">
                      Public
                    </span>
                  </div>

                </div>

                <p>
                  {repo.description || "No description available"}
                  {/* <Button onClick={handledeleteRepo}>delete</Button> */}
                </p>

                <div className="repo-footer">

                  <span>
                    <span className="status-dot"></span>
                    JavaScript
                  </span>

                  <span>
                    ★ 0
                  </span>

                </div>

              </div>
            );

          })}

        </div>

      </main>
      <Footer />
    </>
  )
}
