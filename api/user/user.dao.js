// DAO
const { pool } = require('../../config/database');

selectAllUsers = async (limit) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectAllUsersQuery = `SELECT id, name FROM User LIMIT ?`;
    const selectAllUsersParams = [limit];
    const [selectAllUsersRows] = await connection.query(
        selectAllUsersQuery,
        selectAllUsersParams
    );
    connection.release();
    return [selectAllUsersRows];
};

selectUser = async (id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserQuery = `SELECT id, name FROM User WHERE id = ?`;
    const selectUserParams = [id];
    const [selectUserRows] = await connection.query(
        selectUserQuery,
        selectUserParams
    );
    connection.release();
    return [selectUserRows];
};

deleteUser = async (id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteUserQuery = `DELETE FROM User WHERE id = ?`;
    const deleteUserParams = [id];
    const [deleteUserRows] = await connection.query(
        deleteUserQuery,
        deleteUserParams
    );
    connection.release();
};

selectUserByName = async (name) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserByNameQuery = `SELECT id, name FROM User WHERE name = ?`;
    const selectUserByNameParams = [name];
    const [selectUserByNameRows] = await connection.query(
        selectUserByNameQuery,
        selectUserByNameParams
    );
    connection.release();
    return [selectUserByNameRows];
};

createUser = async (name) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const createUserQuery = `INSERT INTO user (name) VALUES (?);`;
    const createUserParams = [name];
    const [createUserRows] = await connection.query(
        createUserQuery,
        createUserParams
    );
    connection.release();
    return [createUserRows];
};

updateUser = async (id, name) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const updateUserQuery = `UPDATE user SET name = ? WHERE id = ?`;
    const updateUserParams = [name, id];
    const [updateUserRows] = await connection.query(
        updateUserQuery,
        updateUserParams
    );
    connection.release();
    return [updateUserRows];
};

module.exports = {
    selectAllUsers,
    selectUser,
    deleteUser,
    selectUserByName,
    createUser,
    updateUser
};