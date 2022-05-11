import express from 'express';
const router = express.Router();
import tagController from '../controllers/tag.controller';
import tagsValidate from '../validations/tags.validate';

router
    // Create
    // .post('/tags', tagsValidate.createNewTag)

    // Read
    .get('/', tagController.findAllTag)

    .get('/tags/:id', tagController.findOneTag)

    //Update
    .put('/tags/:id', tagController.updateTag)
    //Delete
    .delete('/tags/:id', tagController.destroyTag)

export default router;