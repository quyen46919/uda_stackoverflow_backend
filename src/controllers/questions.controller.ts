import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";

import questionsValidate from '../validations/questions.validate';

// Create
const createNewQuestion = async (req: Request, res: Response) => {
    const { name, des, is_destroy, create_at, update_at } = req.body;
    // const question = await questionsValidate.createNewQuestion({
    //     name,
    //     des,
    //     is_destroy,
    //     create_at,
    //     update_at
    // });
    // return res.status(201).json(question);
};

// Read
const findAllQuestion = (req: Request, res: Response) => {
    let query = 'SELECT * FROM uda_questions';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
const findOneQuestion = (req: Request, res: Response) => {
    let query = 'SELECT * FROM questions';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
// Update
const updateQuestion = (req: Request, res: Response) => {
    let query = 'SELECT * FROM questions';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
// Delete
const destroyQuestion = (req: Request, res: Response) => {
    let query = 'SELECT * FROM questions';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
export default {
    findAllQuestion,
    createNewQuestion,
    findOneQuestion,
    destroyQuestion,
    updateQuestion
}