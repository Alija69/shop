const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mysqlHost: process.env.MYSQL_HOST,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPort: 3306,
};
