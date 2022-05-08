import express from 'express';
const router = express.Router();
import boardController from '../controllers/board.controller';
import boardValidation from '../validations/board.validation';

router
    .get('/', boardController.getAllBoard)
    .post('/', boardValidation.createNewBoard , boardController.getAllBoard);

export default router;