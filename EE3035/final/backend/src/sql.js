// 連線 DB 函數
import mysql from "mysql";
import dotenv from 'dotenv-defaults';

dotenv.config();

var connection = mysql.createConnection({
  host: "35.234.37.229",
  user: "root",
  password: process.env.PASSWORD,
  database: "DBP",
  port: 3306
});

export default connection;
