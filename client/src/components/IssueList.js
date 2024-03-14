import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getRandomNumber() {
    return Math.round(Math.random() * 500);
}


function IssueList() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const response = await axios.get('http://localhost:3001/issues');
            setIssues(response.data);
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };

    const handleCreateIssue = async () => { 
        const random = getRandomNumber();
        try {
            await axios.post('http://localhost:3001/issues', {
                title: `New Issue ${random}`,
                description: `Description of new issue number ${random}`
            });
            fetchIssues();
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    };

    return (
        <div>
            <h1>Issue List</h1>
            <button className="add-issue-button" onClick={handleCreateIssue}>Create Issue</button>
            <ul>
                {issues.map(issue => (
                    <li key={issue.id}>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                        <a href={issue.link}>{issue.link}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IssueList;