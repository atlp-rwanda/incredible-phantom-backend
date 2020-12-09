import redis from 'redis';
import { config } from 'dotenv';

config();

const { REDIS_PWD, REDIS_URL } = process.env;
const redisClient = redis.createClient({
  url: REDIS_URL,
  password: REDIS_PWD,
});

redisClient.on('error', (err) => console.log('Error ', err));

export default redisClient;
