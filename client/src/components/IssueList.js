import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <h1>Issue List</h1>
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