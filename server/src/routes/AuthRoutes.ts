import Express from 'express';
import * as authController from '../controllers/AuthController';
import { verifyAccessToken } from '../services/JwtService';

const router = Express.Router();

// router.post('/googleAuth', googleAuth);
router.post('/login', authController.loginHandler);
router.post('/register', authController.registerHandler);
router.post('/forgot-password', authController.forgotPasswordHandler);
router.post('/reset-password/:encryptedLinkToken', authController.resetPasswordHandler);
router.put('/verify-email/:token', authController.emailVerificationHandler);
router.get('/refresh-token', authController.refreshTokenHandler);
router.get('/isAuthenticated', authController.checkIsAuthenticated);

/*
   Protected Routes 
   To access this routes user must include token in cookies
*/
router.post('/logout', verifyAccessToken, authController.logoutHandler);

export default router;
