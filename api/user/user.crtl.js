// API 로직
const userDao = require('./user.dao');

const index = async (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // req.query.limit는 문자열로 들어옴 -> 정수형으로 변경
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    const [selectedLimitUsersRows] = await userDao.selectAllUsers(limit);
    res.json(selectedLimitUsersRows);
};

const show = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    const [selectedUserRow] = await userDao.selectUser(id);
    const user = selectedUserRow[0];
    if (!user) {
        return res.status(404).end();
    }

    res.json(user);
};

const destroy = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    const [selectedUserRow] = await userDao.selectUser(id);
    const user = selectedUserRow[0];
    if (!user) {
        return res.status(404).end();
    }

    await userDao.deleteUser(id);
    res.status(204).end();
};

const create = async (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.status(400).end();
    }

    const [selectedUserByNameRow] = await userDao.selectUserByName(name);
    const isConflict = selectedUserByNameRow.length;
    if (isConflict) {
        return res.status(409).end();
    }
    
    const [createUserRow] = await userDao.createUser(name);
    const createdUser = {
        id: createUserRow.insertId,
        name
    }
    res.status(201).json(createdUser);
};

const update = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    const name = req.body.name;
    if (!name) {
        return res.status(400).end();
    }
    const [selectedUserByNameRow] = await userDao.selectUserByName(name);
    const isConflict = selectedUserByNameRow.length;
    if (isConflict) {
        return res.status(409).end();
    }

    const [selectedUserRow] = await userDao.selectUser(id);
    const user = selectedUserRow[0];
    if (!user) {
        return res.status(404).end();
    }

    await userDao.updateUser(id, name);

    const [updatedUserRow] = await userDao.selectUser(id);
    const updatedUser = updatedUserRow[0];
    res.json(updatedUser);
};

module.exports = {
    index,
    show,
    destroy,
    create,
    update
}