import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";

import tagsValidate from '../validations/tags.validate';

// Create
const createNewTag = async (req: Request, res: Response) => {
    const { name, des, is_destroy, create_at, update_at } = req.body;
    // const tag = await tagsValidate.createNewTag({
    //     name,
    //     des,
    //     is_destroy,
    //     create_at,
    //     update_at
    // });
    // return res.status(201).json(tag);
};

// Read
const findAllTag = (req: Request, res: Response) => {
    let query = 'SELECT * FROM uda_tags';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
const findOneTag = (req: Request, res: Response) => {
    let query = 'SELECT * FROM tags';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
// Update
const updateTag = (req: Request, res: Response) => {
    let query = 'SELECT * FROM tags';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
// Delete
const destroyTag = (req: Request, res: Response) => {
    let query = 'SELECT * FROM tags';
    const result = getConnectionAndQuery(req, res, query);
    return result;
};
export default {
    findAllTag,
    createNewTag,
    findOneTag,
    destroyTag,
    updateTag
}