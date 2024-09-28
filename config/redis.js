const { Worker, Queue, QueueScheduler } = require('bullmq');
const Redis = require('ioredis');

// Redis configuration
const connection = new Redis({
  host: 'localhost', // Change to your Redis host
  port: 6379, // Change to your Redis port
});

module.exports = connection;
