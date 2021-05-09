const express = require('express');
const morgan = require('morgan');
const app = express();
const users = [
    {id: 1, name: 'aaaa'},
    {id: 2, name: 'bbbb'},
    {id: 3, name: 'cccc'}
];

app.use(morgan('dev'));

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

module.exports = app;