import redis from 'redis';
import { config } from 'dotenv';

config();

const redisClient = redis.createClient({
  url: process.env.REDISCLOUD_URL,
  password: process.env.REDIS_PWD,
});

redisClient.on('error', (err) => console.log('Error ', err));

export default redisClient;
