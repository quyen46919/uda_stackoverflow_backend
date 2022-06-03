import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";
import IMySQLResult from "../interfaces/MySQLResult";
import { convertReqBodyForInsert } from "../services/convertReqBodyForInsert";

const createNewAnswer = async (req: Request, res: Response) => {
    const { content, question_id, user_id } = req.body;

    const insertValues = convertReqBodyForInsert({
        content: content,
        question_id: question_id,
        user_id: user_id
    });
    let query = `
        INSERT INTO UDA_ANSWERS (${insertValues.names}) VALUES 
        (${insertValues.values});
    `;
    try {
        const result: IMySQLResult = await getConnectionAndQuery(query);
        console.log(result);

        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Tạo câu trả lời thành công!" });
        } else {
            res.status(500).json({ message: "Tạo câu trả lời thất bại" });
        }        
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

export default {
    createNewAnswer
}