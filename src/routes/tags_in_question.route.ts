import express from 'express';
const router = express.Router();
import tagInQuestionController from '../controllers/tag_in_question.controller';

router
    // Create
    // .post('/questions', questionsValidate.createNewQuestion)

    // Read
    .get('/', tagInQuestionController.findAllQuestion)

export default router;