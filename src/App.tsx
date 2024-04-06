// src/App.tsx

import React, { useState } from 'react';
import { Octokit } from '@octokit/rest';
import TextInput from "./components/input"; // Import Octokit

const App: React.FC = () => {
    const [commits, setCommits] = useState<string[]>([]);
    const [ownerName, setOwnerName] = useState<string>("");
    const [repoName, setRepoName] = useState<string>("");
    const [branchName, setBranchName] = useState<string>("master");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e :any) => {
        e.preventDefault();
        const octokit = new Octokit({
            auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN, // Replace with your token
        });
        // Fetch commit history from your repository
        octokit.rest.repos
            .listCommits({
                owner: ownerName,
                repo: repoName,
                branch: branchName,
            })
            .then(({ data }) => {
                const commitMessages = data.map((commit: any) => commit.commit.message);
                setError('')
                setCommits(commitMessages);
            })
            .catch((error) => {
            setError(error.message)
            console.error('Error fetching commits:', error)});

    }
    return (
        <div className="container m-auto">
            <div className="bg-gray-100 p-3 min-h-screen flex items-center justify-center">

                <div className="max-w-md p-4 bg-white rounded shadow-md">
                    <form onSubmit={handleSubmit} className="card shadow-lg p-3 rounded mb-2">
                        <TextInput onChange={(e: any) => setOwnerName(e.target.value)} value={ownerName} label={"Owner User Name"} placeHolder={"Owner username"} />
                        <TextInput onChange={(e: any) => setRepoName(e.target.value)} value={repoName} label={"Public Repo Name"} placeHolder={"Public repo name"} />
                        <TextInput onChange={(e: any) => setBranchName(e.target.value)} value={branchName} label={"Branch Name"} placeHolder={"Branch name"} />
                        <div className={'text-red-400'}>{error}</div>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                            Button
                        </button>

                    </form>
                    <h1 className="text-2xl font-semibold mb-4">Git Commit History</h1>
                    <ul className="list-disc pl-6">
                        {commits.map((message, index) => (
                            <li key={index} className="mb-2 break-words">
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
