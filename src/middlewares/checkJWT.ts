import e, { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import configs from "../config/config"; 

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
    let key = req.headers.authorization?.split(' ')[0];
    let token = req.headers.authorization?.split(' ')[1];
    
    if (key !== "Bearer") {
        return res.status(401).json({ message: 'khóa JWT không hợp lệ' });
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, configs.serverToken.secretKey);
            res.locals.jwt = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Token không hợp lệ' });
        }
    } else {
        res.status(401).json({ message: 'Vui lòng đăng nhập để sử dụng tính năng này' });
    }
};

export default checkJWT;