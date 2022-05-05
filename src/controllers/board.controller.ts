import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";

const getAllBoard = (req: Request, res: Response) => {
    let query = 'SELECT * FROM boards';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};

export default {
    getAllBoard,
}