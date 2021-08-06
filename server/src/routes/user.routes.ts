import { Router } from 'express';
import { me } from '../controllers/user.controller';
import { verifyAccessToken } from '../services/jwt.service';

const router = Router();

router.get('/me', verifyAccessToken, me);

export default router;
