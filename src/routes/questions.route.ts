import express from 'express';
const router = express.Router();
import questionController from '../controllers/questions.controller';
import questionsValidate from '../validations/questions.validate';

router
    // Create
    // .post('/questions', questionsValidate.createNewQuestion)

    // Read
    .get('/', questionController.findAllQuestion)

    .get('/:id', questionController.findOneQuestion)

    //Update
    .put('/:id', questionController.updateQuestion)
    //Delete
    .delete('/:id', questionController.destroyQuestion)

export default router;