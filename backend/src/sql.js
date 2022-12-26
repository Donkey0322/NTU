// 連線 DB 函數
import mysql from "mysql";
var connection = mysql.createConnection({
  host: "35.234.37.229",
  user: "root",
  password: "b097050030415",
  database: "DBP",
  port: 3306
});

export default connection;
