// API 로직
let users = [
    {id: 1, name: 'aaaa'},
    {id: 2, name: 'bbbb'},
    {id: 3, name: 'cccc'}
];

const selectAllUsers = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // req.query.limit는 문자열로 들어옴 -> 정수형으로 변경
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
};

const selectUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const user = users.filter((user) => user.id === id)[0];
    if (!user) {
        return res.status(404).end();
    }
    res.json(user);
};

const deleteUser = (req, res) => {
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
};

const createUser = (req, res) => {
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
};

const updateUser = (req, res) => {
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
};

module.exports = {
    selectAllUsers,
    selectUser,
    deleteUser,
    createUser,
    updateUser
}