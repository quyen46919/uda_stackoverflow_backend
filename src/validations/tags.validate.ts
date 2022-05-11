import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createNewTag = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'id': Joi.number().min(1).required(),
        'name': Joi.string().max(20).min(1).required(),
        'des': Joi.string().max(1000).min(1),
        'is_destroy': Joi.boolean().required(),
        'create_at': Joi.string().max(50).required(),
        'update_at': Joi.string().max(50),

    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export default {
    createNewTag,
}