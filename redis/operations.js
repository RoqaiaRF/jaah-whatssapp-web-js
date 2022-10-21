const Redis = require("ioredis");
require("dotenv").config();

//get the REDIS URL from env file and connect to the server
const REDIS_URL = process.env.REDIS_URL;
const client = new Redis(REDIS_URL);


//^ Checking the existence of keys

const isExists = (key) => {
  let isExistsed = false;
  client.exists(key, function (err, reply) {
    if (reply === 1) {
      isExistsed = true;
    } else {
      isExistsed = false;
    }
  });
  return isExistsed;
};

//^ Deleting keys

const deleteKeys = (key) => {
  return client.del(key, function (err, reply) {
    return reply;
  });
};

//^ give an expiration time to an existing key

const giveExpirationTime = (key, time) => {
  client.expire(key, time); //EX: client.expire('status', 300);
};

//^ Incrementing for numeric keys

const incrementbyValue = (key, value) => {
  client.incrby(key, value, function (err, reply) {
  });
};
//^ decrementing for numeric keys 
const decrementbyValue = (key, value) => {
  client.decrby(key, value, function (err, reply) {
  });
};

module.exports = {
  isExists,
  deleteKeys,
  giveExpirationTime,
  incrementbyValue,
  decrementbyValue,
};

/*
Dealing with server 
 * 1- sudo service redis-server stop //?: kILL EXISTING SERVER:
 * 2- redis-server //? RERUN REDIS-SERVER
 
To config redis in terminal:
 * 1- Open new terminal
 * 2- redis-cli 

*/