import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller';
import authValidation from '../validations/auth.validation';

router
    .post('/login', authValidation.login, authController.login)
    .post('/logup', authValidation.logup, authController.logup)
    .get('/confirmation/:emailToken', authController.confirmEmailToken)
    .post('/refresh-token', authController.refreshToken)
    .post('/forgot-password', authValidation.forgotPassword, authController.forgotPassword)
    .get('/reset-password/:emailToken', authController.resetPassword);

export default router;