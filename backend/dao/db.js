const { Client, Pool } = require("pg");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config"))[env];

const pool = new Pool(config.dbConfig);

const db = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        return reject(err);
      }
      client.query(query, values, (err, result) => {
        release();
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
};

module.exports = db;
