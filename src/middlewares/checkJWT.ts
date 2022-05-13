import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import configs from "../config/config"; 

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
        try {
            const decoded = jwt.verify(token, configs.serverToken.secretKey);
            res.locals.jwt = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Vui lòng đăng nhập để xử dụng tính năng này' });
        }
    }
};

export default checkJWT;