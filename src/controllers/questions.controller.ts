import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";
import IMySQLResult from "../interfaces/MySQLResult";
import IQuestion from "../interfaces/question";
import mysql from 'mysql2';
import { convertReqBodyForInsert } from "../services/convertReqBodyForInsert";
import { convertArrayToInsertTempTable } from "../services/convertArrayToInsertTempTable";

const createNewQuestion = async (req: Request, res: Response) => {
    const { title, content, team_id, user_id, tag_list } = req.body;

    const insertValues = convertReqBodyForInsert({
        title: title,
        content: content,
        team_id: team_id,
        user_id: user_id
    });
    let query = `
        INSERT INTO UDA_QUESTIONS (${insertValues.names}) VALUES 
        (${insertValues.values});
    `;
    try {
        const result: IMySQLResult = await getConnectionAndQuery(query);
        console.log(result);

        const array2 = convertArrayToInsertTempTable(result.insertId, tag_list);
        let query2 = `INSERT INTO UDA_TAGS_IN_QUESTION(question_id, tag_id) VALUES ${array2};`;
        const result2: IMySQLResult = await getConnectionAndQuery(query2);
        console.log(result2);

        if (result2.affectedRows === tag_list.length) {
            res.status(200).json({ message: "Tạo câu hỏi thành công!" });
        } else {
            res.status(500).json({ message: "Tạo câu hỏi thất bại" });
        }        
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const findAllQuestion = async (req: Request, res: Response) => {
    try {
        let query = `
            SELECT q.id, q.title, q.content, q.is_resolved, q.team_id, 
            q.created_at, q.status, u.id as user_id, u.username, u.avatar
            FROM UDA_QUESTIONS q JOIN UDA_USERS u ON  q.user_id = u.id
            WHERE q.status = 1;
        `;
        const questions: IQuestion[] = await getConnectionAndQuery(query);

        if (!questions) res.status(401).json({ message: "Không có câu hỏi nào được tạo" });
        res.status(200).json({ message: "Lấy danh sách câu hỏi thành công", questions: questions });
    } catch (err) {
        res.status(401).json({ message: err });
    }
};

const findQuestionDetail = async (req: Request, res: Response) => {
    try {
        const questionId = req.params.questionId;
        let query = `
        SELECT
            q.id,
            q.title,
            q.content,
            q.status,
            q.team_id,
            q.is_resolved,
            u.id as user_id,
            u.username,
            u.avatar,
            GROUP_CONCAT(DISTINCT tag_list.name) as tags,
            q.is_resolved,
            GROUP_CONCAT(DISTINCT JSON_OBJECT(
                'id', a.id,
                'content', a.content,
                'created_at', a.created_at,
                'is_corrected', a.is_corrected,
                'post_user_id', a.post_user_id,
                'user_avatar', a.avatar,
                'username', a.username
            ) separator "///") as answers
        FROM 
            UDA_QUESTIONS AS q
            INNER JOIN UDA_USERS as u
            INNER JOIN (
                SELECT a.id, a.content, a.is_corrected, a.created_at, a.question_id, u.username, u.id as post_user_id, u.avatar
                FROM UDA_ANSWERS a LEFT JOIN UDA_USERS u ON a.user_id = u.id
            ) AS a ON a.question_id = q.id
            INNER JOIN (
                SELECT name, question_id FROM UDA_TAGS t 
                LEFT JOIN UDA_TAGS_IN_QUESTION tiq ON t.id = tiq.tag_id
            ) AS tag_list ON q.id = tag_list.question_id
        WHERE q.id = ${mysql.escape(questionId)} and q.status = 1;
        `;
        const questionDetail: any = await getConnectionAndQuery(query);

        if (!questionDetail[0].id) res.status(401).json({ message: "Câu hỏi không tồn tại hoặc chưa được duyệt" });
        
        if (questionDetail[0].answers) {
            let answerList: any[] = [];
            const splitedArray = questionDetail[0].answers.split("///");
            splitedArray.forEach((answer: any) => {
                answerList.push(JSON.parse(answer));
            });
            const response = {
                ...questionDetail[0],
                answers : answerList
            }
            res.status(200).json({ message: "Lấy thông tin câu hỏi thành công", question: response });
        } else {
            res.status(200).json({ message: "Lấy thông tin câu hỏi thành công", question: questionDetail[0] });
        }
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

const updateQuestion = (req: Request, res: Response) => {};

const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const questionId = parseInt(req.params.questionId);
        console.log(typeof questionId);
        let query = `
            UPDATE UDA_QUESTIONS q
            JOIN UDA_USERS u ON q.user_id = u.id
            SET q.status = 2, q.status_message = 'Người dùng đã xóa câu hỏi này'
            WHERE q.id = ${questionId} AND u.email = '${res.locals.jwt.email}';
        `;
        console.log(query);


        const result: IMySQLResult = await getConnectionAndQuery(query);

        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Xóa câu hỏi thành công!" });
        } else {
            res.status(500).json({ message: "Xóa câu hỏi thất bại" });
        }
    } catch (err) {
        res.status(401).json({ message: err });
    }
};

export default {
    findAllQuestion,
    createNewQuestion,
    findQuestionDetail,
    deleteQuestion,
    updateQuestion
}