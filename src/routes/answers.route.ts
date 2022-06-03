import express from 'express';
const router = express.Router();
import anwserController from '../controllers/answer.controller';
import answerValidation from '../validations/answers.validation';

router
    .post('/', answerValidation.createNewAnswer, anwserController.createNewAnswer);

export default router;