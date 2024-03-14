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


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;