
const Redis = require("ioredis");
require("dotenv").config();

//get the REDIS URL from env file and connect to the server
const REDIS_URL = process.env.REDIS_URL;
const client = new Redis(REDIS_URL);

//store data to redis as String
const setUserVars = async (sender_id, variable, value) => {
  await client.set(`${sender_id}:${variable}`, value, "EX", 900);
};

//get the stored data from the redis session
const getUserVars = async (sender_id, variable) => {
  const myKeyValue = await client.get(`${sender_id}:${variable}`);

  if (myKeyValue) {
    return myKeyValue;
  } else {
    new Promise((resolve, reject) => {
      client.get(`${sender_id}:${variable}`, (err, data) => {
        if (data != null || data != undefined) {
          // console.log("Redis Success! but can't get data");
          return resolve(data);
        } else if (err) {
          return reject(err);
        }
      });
    });
  }
};

// delete all data from all databases in redis
const deleteAllKeys = async () => {
  await client.flushall();
};

module.exports = {
  setUserVars,
  deleteAllKeys,
  getUserVars,
};
