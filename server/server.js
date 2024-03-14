const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Initial hardcoded data
let issues = [
    {id: 1, title: "Issue 1", description: "Description...."},
    {id: 2, title: "Issue 2", description: "Description..."}
];

app.use(bodyParser.json());

// Get all issues --> Read all issues
app.get('/issues', (req,res) => {
    res.json(issues)
});

// Get issue by ID --> Read a specific issue
app.get('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const issue = issues.find(issue => issue.id === id);
    if(issue) {
        res.json(issue);
    } else {
        res.status(404).json({
            message: "Issue not found"
        });
    }
});

// Create new issue --> Insert the new issue to the list
app.post('/issues', (req,res) => {
    const { title, description } = req.body;
    const id = issues.length +1;
    const newIssue = { id, title, description };
    issues.push(newIssue);
    res.status(201).json(newIssue);
});

// Update issue by ID --> Change the item based on ID
app.put('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = issues.findIndex(issue => issue.id === id);
    if (index !== -1) {
        issues[index] = { ...issues[index], ...req.body };
        res.json(issues[index]);
    } else {
        res.status(404).json({ message: "Issue not found" });
    }
});

app.delete('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = issues.findIndex(issue => issue.id === id);
    if (index !== -1) {
        issues.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Issue not found" });
    }
});

// Delete issue by ID --> Remove the item based on ID



app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;