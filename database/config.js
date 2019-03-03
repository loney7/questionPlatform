const mysql = require('promise-mysql');

const dbConfig = {
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    user            : "root2",
    password        : "pswd",
    database        : "bullseye",
    host            : "18.188.151.103",
}

module.exports = async () => {
    try {
        let pool;
        let con;
        if (pool) {
            con = pool.getConnection();
        }
        else {
            pool = await mysql.createPool(dbConfig);
            con = pool.getConnection();
        }
        return con;
    } catch (ex) {
        throw ex;
    }
}