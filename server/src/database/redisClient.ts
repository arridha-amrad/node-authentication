import Redis from 'ioredis';
const redisClient = new Redis();

export const set = (key: string, value: string): Promise<'OK' | null> =>
   redisClient.set(key, value);

export const get = async (key: string): Promise<string | null> =>
   redisClient.get(key);

export const del = async (key: string): Promise<number> => redisClient.del(key);
