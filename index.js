const express = require('express');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const app = express();

let users = [
    {id: 1, name: 'aaaa'},
    {id: 2, name: 'bbbb'},
    {id: 3, name: 'cccc'}
];

app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
/*
    원래는 bodyParser를 쓰지만 Express> = 4.16.0 부터
    express.json(), express.urlencoded() 빌트인
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const user = users.filter((user) => user.id === id)[0];
    if (!user) {
        return res.status(404).end();
    }
    users = users.filter(user => user.id !== id);
    res.status(204).end();
})

app.post('/users', (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.status(400).end();
    }

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) {
        return res.status(409).end();
    }
    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
})

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    const name = req.body.name;
    if (!name) {
        return res.status(400).end();
    }
    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) {
        return res.status(409).end();
    }

    const user = users.filter((user) => user.id === id)[0];
    if (!user) {
        return res.status(404).end();
    }

    user.name = name;
    
    res.json(user);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

module.exports = app;