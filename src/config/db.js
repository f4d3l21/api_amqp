const mariadb = require('mariadb');

const db = mariadb.createPool({
    host: 'localhost', 
    user: 'root', 
    password: 'root',
    database: 'logs_amqp'
});

async function DbConnection() {
    let con;
    try {
      con = await db.getConnection();
      console.log("Connected to the database!");

    } catch (error) {
      console.error("Error connecting to the database:", error);
    } finally {
      if (con) con.release(); 
    }
  }
  

module.exports = db;

