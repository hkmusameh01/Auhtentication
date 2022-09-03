require("env2")(".env");
const { Pool } = require("pg");

const { NODE_ENV, DATABASE_URL, DEV_DB_URL, TEST_DB_URL } = process.env;

let connectionString = '';
let ssl = '';

switch(NODE_ENV) {
  case "production":
    connectionString = DATABASE_URL;
    ssl = {
      rejectUnauthorized: false,
    }
    break;
  case "development":
    connectionString = DEV_DB_URL;
    ssl = false;
    break;
  case "test":
    connectionString = TEST_DB_URL;
    ssl = false;
    break;
  default:
    throw new Error("db url invalid")
}

const connection = new Pool({
  connectionString,
  ssl
});

module.exports = connection;


// 1:15:27