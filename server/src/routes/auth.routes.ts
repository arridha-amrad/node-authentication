import Express from 'express';
import * as authController from '../controllers/auth.controllers';
import { verifyAccessToken } from '../services/jwt.service';

const router = Express.Router();

// router.post('/googleAuth', googleAuth);
router.post('/login', authController.loginController);
router.post('/register', authController.registerController);
router.post('/forgot-password', authController.forgotPasswordController);
router.post('/reset-password/:token', authController.resetPasswordController);
router.put('/verify-email/:token', authController.verifyEmailController);
router.get('/refresh-token', authController.handleRefreshToken);
router.post('/logout', verifyAccessToken, authController.logoutController);

export default router;
