import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";
import IMySQLResult from "../interfaces/MySQLResult";
import { convertReqBody } from "../services/convertReqBody";
import { hashPassword } from "../services/hashPassword";

const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const reqBody = req.body;
        const arr = [];
        for (const prop in reqBody) {
            arr.push(`${prop} = "${reqBody[prop]}"`);
        }
        const subQuery = arr.join(", ");
        let query = `UPDATE UDA_USERS SET ${subQuery} WHERE ID = ${userId} AND EMAIL = '${res.locals.jwt.email}' `;
        const result = await getConnectionAndQuery(query);

        if (result) {
            res.status(200).json({ message: 'Cập nhật thông tin thành công' });
        } else {
            res.status(400).json({ message: 'Cập nhật thông tin thất bại' });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const updatePassword = async (req: Request, res: Response) => {
    try {
        // if (res.locals.jwt.email) {
        //     res.status(400).json({ message: 'Vui lòng đăng nhập để xử dụng tính năng này' });
        // }

        const userId = req.params.userId;
        const subQuery = convertReqBody({ 'hash_password': await hashPassword(req.body.password) });
        let query = `UPDATE UDA_USERS SET ${subQuery} WHERE ID = ${userId} AND EMAIL = '${res.locals.jwt.email}'`;

        const result = await getConnectionAndQuery(query) as IMySQLResult;
        if (result.affectedRows !== 0) {
            res.status(200).json({ message: 'Cập nhật thông tin thành công' });
        } else {
            res.status(400).json({ message: 'Cập nhật thông tin thất bại' });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

export default {
    updateUserInfo,
    updatePassword
};