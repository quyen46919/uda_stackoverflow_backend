import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const logup = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'email': Joi.string().max(100).min(1).required(),
        'password': Joi.string().min(4).max(50).required(),
        'username': Joi.string().min(4).max(50).required(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'email': Joi.string().max(100).min(1).required(),
        'password': Joi.string().min(4).max(50).required(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'email': Joi.string().max(100).min(1).required(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export default {
    logup,
    login,
    forgotPassword
};