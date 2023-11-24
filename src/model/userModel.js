const pool = require('../config/db');

const createUser = async (user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const result = await conn.query(query, [user.username, user.email, user.password]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release(); 
  }
};

module.exports = {
    createUser
};

