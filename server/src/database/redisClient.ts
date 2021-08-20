import Redis from 'redis';
const redisClient = Redis.createClient();

export const set = (key: string, value: string): Promise<'OK'> => {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};

export const get = async (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};

export const del = async (key: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (res) => {
      if (typeof res === 'undefined') {
        reject('no redis key removed');
      }
      resolve(1);
    });
  });
};
