import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";
import IMySQLResult from "../interfaces/MySQLResult";
import { convertReqBodyForUpdate } from "../services/convertReqBodyForUpdate";
import { hashPassword } from "../services/hashPassword";
import mysql from 'mysql2';
import IQuestion from "../interfaces/question";
import IUser from "../interfaces/user";
import { comparePassword } from "../services/comparePassword";

const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = +req.params.userId;
        console.log(typeof userId);
        const reqBody = req.body;
        const arr = [];
        for (const prop in reqBody) {
            arr.push(`${prop} = "${reqBody[prop]}"`);
        }
        const subQuery = arr.join(", ");
        let query = `UPDATE UDA_USERS SET ${subQuery} WHERE ID = ${mysql.escape(userId)} AND EMAIL = '${res.locals.jwt.email}' `;
        const result = await getConnectionAndQuery(query);
        console.log('query = ', query);

        let query2 = `SELECT * FROM UDA_USERS WHERE ID = ${mysql.escape(userId)} AND EMAIL = '${res.locals.jwt.email}'`;
        const userInfo: IUser[] = await getConnectionAndQuery(query2);
        console.log(userInfo);

        if (result) {
            res.status(200).json({ 
                message: 'Cập nhật thông tin thành công',
                user: userInfo[0]
            });
        } else {
            res.status(400).json({ message: 'Cập nhật thông tin thất bại' });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const updatePassword = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        let queryCheckValidPassword = `SELECT * FROM UDA_USERS WHERE ID = ${userId} AND EMAIL = '${res.locals.jwt.email}'`;
        const userList: IUser[] = await getConnectionAndQuery(queryCheckValidPassword);
        const userPassword = userList[0].hash_password as string;
        if (!(await comparePassword(req.body.oldPassword, userPassword))) {
            return res.status(400).json({ message: "Mật khẩu sai" })
        }

        const subQuery = convertReqBodyForUpdate({ 'hash_password': await hashPassword(req.body.password) });
        let query = `UPDATE UDA_USERS SET ${subQuery} WHERE ID = ${userId} AND EMAIL = '${res.locals.jwt.email}'`;

        const result = await getConnectionAndQuery(query) as IMySQLResult;
        if (result.affectedRows !== 0) {

            let queryUserInfo = `SELECT * FROM UDA_USERS WHERE ID = ${mysql.escape(userId)} AND EMAIL = '${res.locals.jwt.email}'`;
            const userInfo: IUser[] = await getConnectionAndQuery(queryUserInfo);

            res.status(200).json({ 
                message: 'Cập nhật thông tin thành công',
                user: userInfo[0]
            });
        } else {
            res.status(400).json({ message: 'Cập nhật thông tin thất bại' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getPostedQuestionByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        let query = `SELECT * FROM UDA_QUESTIONS WHERE user_id = ${mysql.escape(userId)} ORDER BY id DESC`;
        const questions: IQuestion[] = await getConnectionAndQuery(query);

        res.status(200).json({ questions: questions })
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export default {
    updateUserInfo,
    updatePassword,
    getPostedQuestionByUserId
};