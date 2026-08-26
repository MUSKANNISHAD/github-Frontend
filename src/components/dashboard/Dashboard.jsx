import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import Navbar from '../Navbar';
import Footer from '../footer';


export default function Dashboard() {


  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchRepositories = async () => {
      try {
        const repositories = await fetch(`http://localhost:5000/repo/FetchRepositoryById/${userId}`);
        const data = await repositories.json();

        // console.log(data.Repository);
        setRepositories(data.Repository);
      } catch (err) {
        console.log("error while fetching repo is  :", err);
      }
    }
    const fetchingSuggestedRepositories = async () => {
      try {
        const repositories = await fetch(`http://localhost:5000/repo/getAllRepository`);
        const data = await repositories.json();

        // console.log(data.allRepo);
        setSuggestedRepositories(data.allRepo);
      } catch (err) {
        console.log("error is :", err);
      }
    }
    fetchRepositories();
    fetchingSuggestedRepositories();
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

  return (
    <>
      <Navbar />

      <section id="dashboard">

        {/* LEFT - Suggested Repositories */}
        <aside className="dashboard-sidebar">

          <div className="section-header">
            <h3>Suggested Repositories</h3>
            <span className="repo-count">
              {suggestedRepositories.length}
            </span>
          </div>

          <div className="repository-list">

            {suggestedRepositories.map((repo) => {
              return (
                <div className="repo-card suggested-card" key={repo._id}>

                  <div className="repo-card-header">
                    <div className="repo-icon">
                      {repo.name.charAt(0).toUpperCase()}
                    </div>

                    <h4>{repo.name}</h4>
                  </div>

                  <p>{repo.description}</p>

                  <div className="repo-footer">
                    <span>
                      <span className="status-dot"></span>
                      Public
                    </span>

                    <span>
                      ★
                    </span>
                  </div>

                </div>
              );
            })}

          </div>

        </aside>


        {/* CENTER - Your Repositories */}
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
                <div className="repo-card own-repo-card" key={repo._id}>

                  <div className="repo-card-header">

                    <div className="repo-icon">
                      {repo.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h4>{repo.name}</h4>

                      <span className="visibility">
                        Public
                      </span>
                    </div>

                  </div>

                  <p>
                    {repo.description || "No description available"}
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


        {/* RIGHT - Upcoming Events */}
        <aside className="events-sidebar">

          <div className="section-header">
            <h3>Upcoming Events</h3>
          </div>

          <div className="events-list">

            <div className="event-card">

              <div className="event-date">
                <span>DEC</span>
                <strong>22</strong>
              </div>

              <div>
                <h4>Tech Conference</h4>
                <p>Technology & Innovation</p>
              </div>

            </div>


            <div className="event-card">

              <div className="event-date">
                <span>JUN</span>
                <strong>10</strong>
              </div>

              <div>
                <h4>Developer MeetUp</h4>
                <p>Developers community</p>
              </div>

            </div>


            <div className="event-card">

              <div className="event-date">
                <span>JUL</span>
                <strong>12</strong>
              </div>

              <div>
                <h4>React Summit</h4>
                <p>React & Frontend</p>
              </div>

            </div>

          </div>

        </aside>

      </section>
      <Footer/>
    </>
  );
}
