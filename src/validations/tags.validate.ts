import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createNewTag = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'name': Joi.string().max(20).min(1).required(),
        'description': Joi.string().min(6).max(1000).required(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

const updateTag = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'name': Joi.string().max(20).min(1),
        'status': Joi.number().valid(0, 1),
        'description': Joi.string().min(6).max(1000),
    }).min(1);

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export default {
    createNewTag,
    updateTag,
}