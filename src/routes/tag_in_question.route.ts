import express from 'express';
const router = express.Router();
import tagInQuestionController from '../controllers/tag_in_question.controller';
import tagInQuestionValidate from '../validations/tag_in_question.validate';

router
    // Create
    // .post('/questions', questionsValidate.createNewQuestion)

    // Read
    .get('/', tagInQuestionController.findAllQuestion)

    .get('/:id', tagInQuestionController.findOneQuestion)

    //Update
    .put('/:id', tagInQuestionController.updateQuestion)
    //Delete
    .delete('/:id', tagInQuestionController.destroyQuestion)

export default router;