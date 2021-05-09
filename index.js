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
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // req.query.limit는 문자열로 들어옴 -> 정수형으로 변경
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const user = users.filter((user) => user.id === id)[0];
    if (!user) {
        return res.status(404).end();
    }
    res.json(user);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

module.exports = app;