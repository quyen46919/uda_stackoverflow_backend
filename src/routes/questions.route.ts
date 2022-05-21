import express from 'express';
const router = express.Router();
import questionController from '../controllers/questions.controller';
import checkJWT from '../middlewares/checkJWT';
import questionsValidate from '../validations/questions.validate';

router
    .get('/', questionController.findAllQuestion)
    .get('/:questionId', questionController.findQuestionDetail)
    .post('/', questionsValidate.createNewQuestion, questionController.createNewQuestion)
    // .put('/:questionId', questionController.updateQuestion)
    .delete('/:questionId', checkJWT, questionController.deleteQuestion)

export default router;