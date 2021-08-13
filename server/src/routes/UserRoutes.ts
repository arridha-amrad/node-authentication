import { Router } from 'express';
import { me } from '../controllers/UserController';
import { verifyAccessToken } from '../services/JwtService';

const router = Router();

router.get('/me', verifyAccessToken, me);

export default router;
