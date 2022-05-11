import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createNewTagInQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'id': Joi.number().min(1).required(),
        'question_id': Joi.number().min(1).required(),
        'tags_id': Joi.number().min(1).required(),

    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export default {
    createNewTagInQuestion,
}