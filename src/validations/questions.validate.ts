import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'id': Joi.number().min(1).required(),
        'question_title': Joi.string().max(200).min(1).required(),
        'content': Joi.string().max(1000).min(1).required(),
        'is_resolved': Joi.boolean().required(),
        'is_destroy': Joi.boolean().required(),
        'create_at': Joi.string().max(50).required(),
        'update_at': Joi.string().max(50),
        'user_id': Joi.number().min(1).required(),
        'team_id': Joi.number().min(1),

    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export default {
    createNewQuestion,
}