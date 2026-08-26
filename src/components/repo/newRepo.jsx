import React, { useState } from 'react';
import "./newRepo.css";
import { Button } from '@primer/react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../footer';


export default function NewRepo() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("");
    const [issue, setIssue] = useState("");
    const [newRepo, setNewRepo] = useState("");

    const handleCreateUser = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        const res = await axios.post(
            "https://p1awbsgo2d.execute-api.ap-south-1.amazonaws.com/repo/CreateRepo",
            {
                name: name,
                description: description,
                owner: userId,
                content: [],
                visibility: visibility
            }
        );
        console.log(res);
        setNewRepo(res);
        window.location.href = "/allRepo"
    };

    return (
        <>
            <Navbar />
            <div className="create-repo-page">

                <div className="create-repo-card">

                    <div className="repo-header">
                        <h1>Create a new repository</h1>
                        <p>
                            A repository contains all the files and code for your project.
                        </p>
                    </div>

                    <form onSubmit={handleCreateUser}>

                        <div className="form-group">
                            <label htmlFor="name">
                                Repository name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="e.g. my-awesome-project"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <small>
                                A short and memorable name for your repository.
                            </small>
                        </div>


                        <div className="form-group">
                            <label htmlFor="description">
                                Description
                                <span> (optional)</span>
                            </label>

                            <input
                                id="description"
                                type="text"
                                placeholder="What is this repository about?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>


                        <div className="form-group">

                            <label>
                                Repository visibility
                            </label>

                            <div className="visibility-options">

                                <label className="visibility-option">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="false"
                                        onChange={(e) =>
                                            setVisibility(e.target.value)
                                        }
                                    />

                                    <div>
                                        <strong>Private</strong>
                                        <p>
                                            Only you can access this repository.
                                        </p>
                                    </div>
                                </label>


                                <label className="visibility-option">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="true"
                                        onChange={(e) =>
                                            setVisibility(e.target.value)
                                        }
                                    />

                                    <div>
                                        <strong>Public</strong>
                                        <p>
                                            Anyone can see this repository.
                                        </p>
                                    </div>
                                </label>

                            </div>

                        </div>


                        <div className="form-group">

                            <label htmlFor="issue">
                                Issue
                                <span> (optional)</span>
                            </label>

                            <input
                                id="issue"
                                type="text"
                                placeholder="Add an initial issue"
                                value={issue}
                                onChange={(e) => setIssue(e.target.value)}
                            />

                        </div>


                        <div className="form-footer">

                            <Button
                                type="submit"
                                variant="primary"
                            >
                                Create repository
                            </Button>

                        </div>

                    </form>

                </div>

            </div>
            <Footer />
        </>
    );
}