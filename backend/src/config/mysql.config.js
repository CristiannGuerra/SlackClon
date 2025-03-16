import mysql from "mysql2";
import ENVIRONMENT from "./enviroment.config";

const pool = mysql.createPool({
    host: ENVIRONMENT.MYSQL.MYSQL_HOST,
    user: ENVIRONMENT.MYSQL.MYSQL_USER,
    password: ENVIRONMENT.MYSQL.MYSQL_PASSWORD,
    database: ENVIRONMENT.MYSQL.MYSQL_DB
})

const promisePool = pool.promise()


export default promisePool