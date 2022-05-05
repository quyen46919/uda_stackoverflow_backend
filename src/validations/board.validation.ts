import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createNewBoard = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        'board_name': Joi.string().max(100).min(1).required(),
        'created_user_id': Joi.number().min(1).required(),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export default {
    createNewBoard,
}