import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controller';
import checkJWT from '../middlewares/checkJWT';
import userValidation from '../validations/user.validation';

router
    .patch('/:userId', checkJWT, userValidation.updateUserInfo, userController.updateUserInfo)
    .patch('/password/:userId', checkJWT, userValidation.updatePassword, userController.updatePassword)
    .get('/questions/:userId', checkJWT, userController.getPostedQuestionByUserId);

export default router;