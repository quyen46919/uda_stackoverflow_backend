import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";

const getAllBoard = async (req: Request, res: Response) => {
    const questionId = req.query.questionId;
    let query = `
    SELECT
        q.id,
        q.title,
        q.content,
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
        INNER JOIN (
            SELECT a.id, a.content, a.is_corrected, a.created_at, a.question_id, u.username, u.id as post_user_id, u.avatar
            FROM UDA_ANSWERS a LEFT JOIN UDA_USERS u ON a.user_id = u.id
        ) AS a ON a.question_id = q.id
        INNER JOIN (
            SELECT name, question_id FROM UDA_TAGS t 
            LEFT JOIN UDA_TAGS_IN_QUESTION tiq ON t.id = tiq.tag_id
        ) AS tag_list ON q.id = tag_list.question_id
    WHERE q.id = ${questionId || 1}
    GROUP BY q.title, q.content, q.id, tag_list.question_id, q.is_resolved;
    `;
    let result: any = await getConnectionAndQuery(req, res, query);
    return result;
};  

export default {
    getAllBoard,
}