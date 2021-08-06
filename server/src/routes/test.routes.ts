import { Router } from 'express';
import { Request, Response } from 'express';
import * as redis from '../database/redisClient';

const testRedisSet = async (req: Request, res: Response): Promise<void> => {
   try {
      const isSet = await redis.set('adnan', 'abbian');
      if (isSet === 'OK') {
         res.status(200).send('set!');
      }
   } catch (error) {
      console.log(error);
   }
};

const testGetRedis = async (req: Request, res: Response): Promise<void> => {
   try {
      const dataFromRedis = await redis.get('adnan');
      if (dataFromRedis) {
         res.status(200).send(dataFromRedis);
      }
   } catch (error) {
      console.log(error);
   }
};

const router = Router();

router.get('/get', testGetRedis);
router.post('/set', testRedisSet);

export default router;
