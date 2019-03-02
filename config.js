const mysql = require('promise-mysql');

const dbConfig = {
        user: "root",
        password: "pswd",
        database: "bullseye",
        host: "localhost"
}

module.exports = async () => {
    try {
        let pool;
        let con;
        if (pool) con = pool.getConnection();
        else {
            pool = await mysql.createPool(dbConfig);
            con = pool.getConnection();
        }
        return con;
    } catch (ex) {
        throw ex;
    }
}