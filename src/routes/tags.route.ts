import express from 'express';
const router = express.Router();
import tagController from '../controllers/tag.controller';
import tagValidation from '../validations/tags.validate';

router
    .get('/', tagController.findAllTag)
    .get('/:tagId', tagController.findOneTag)
    .post('/',  tagValidation.createNewTag, tagController.createNewTag)
    .patch('/:tagId', tagValidation.updateTag, tagController.updateTagStatus)
    .delete('/:tagId', tagController.destroyTag);

export default router;