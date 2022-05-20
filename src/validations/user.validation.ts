import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'avatar': Joi.string().max(255).min(1),
        'username': Joi.string().max(100).min(1),
        'is_darkmode': Joi.number().valid(0, 1),
        'language': Joi.string().valid('Vietnamese', 'English'),
        'disable_notification': Joi.number().valid(0, 1)
    }).min(1);

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'password': Joi.string().max(255).min(1).required(),
        'oldPassword': Joi.string().max(255).min(1).required(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export default {
    updateUserInfo,
    updatePassword
}