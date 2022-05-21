import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createNewQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'title': Joi.string().max(10000).min(10).required(),
        'content': Joi.string().min(10).required(),
        'user_id': Joi.number().min(1).required(),
        'team_id': Joi.number().min(1).allow(null, ""),
        'tag_list': Joi.array().items(Joi.number()).min(1).allow(null, "")
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