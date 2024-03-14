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

// Get all issues
app.get('/issues', (req,res) => {
    res.json(issues)
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})