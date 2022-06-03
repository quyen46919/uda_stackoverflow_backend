import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createNewAnswer = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'content': Joi.string().min(10).required(),
        'user_id': Joi.number().min(1).required(),
        'question_id': Joi.number().min(1).required(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export default {
    createNewAnswer
}