import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";
import IMySQLResult from "../interfaces/MySQLResult";
import ITag from "../interfaces/tag";
import { convertReqBodyForUpdate } from "../services/convertReqBodyForUpdate";

const createNewTag = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        let query = `INSERT INTO UDA_TAGS(NAME, DESCRIPTION) VALUES ('${name}', '${description}')`;
        const result: IMySQLResult = await getConnectionAndQuery(query);
        console.log(result);

        if (result.affectedRows === 1) {
            let query = `SELECT * FROM UDA_TAGS WHERE NAME = '${name}'`;
            const tag: ITag = await getConnectionAndQuery(query);
            res.status(200).json({ message: "Tạo thẻ thành công!", tag: tag });
        } else {
            res.status(500).json({ message: "Tạo thẻ thất bại" });
        }
    } catch (err) {
        res.status(401).json({ message: err });
    }
};

const findAllTag = async (req: Request, res: Response) => {
    try {
        let query = `SELECT * FROM UDA_TAGS WHERE status = 1`;
        const tags: ITag[] = await getConnectionAndQuery(query);

        if (!tags) res.status(401).json({ message: "Không có thẻ nào được tạo" });
        res.status(200).json({ message: "Lấy danh sách thẻ thành công", tags: tags });
    } catch (err) {
        res.status(401).json({ message: err });
    }
};

const findOneTag = async (req: Request, res: Response) => {
    try {
        const tagId = req.params.tagId;
        let query = `SELECT * FROM UDA_TAGS WHERE id=${tagId}`;
        const tag: ITag = await getConnectionAndQuery(query);

        if (!tag) res.status(401).json({ message: "Thẻ không tồn tại" });
        res.status(200).json({ message: "Lấy nội dung thẻ thành công", tags: tag });
    } catch (err) {
        res.status(401).json({ message: err });
    }
};

const updateTagStatus = async (req: Request, res: Response) => {
    try {
        const tagId = req.params.tagId;
        const subQuery = convertReqBodyForUpdate(req.body);
        let query = `UPDATE UDA_TAGS SET ${subQuery} WHERE ID = ${tagId}`;
        const result: IMySQLResult = await getConnectionAndQuery(query);

        if (result.affectedRows === 1) {
            res.status(401).json({ message: "Cập nhật nội dung thẻ thành công!" });
        } else {
            res.status(200).json({ message: "Cập nhật nội dung thẻ thất bại" });
        }
    } catch (err) {
        res.status(401).json({ message: err });
    }
};

const destroyTag = async (req: Request, res: Response) => {
    try {
        const tagId = req.params.tagId;
        let query = `DELETE FROM UDA_TAGS WHERE ID = ${tagId}`;
        const result: IMySQLResult = await getConnectionAndQuery(query);
        console.log(result);

        if (result.affectedRows === 1) {
            res.status(401).json({ message: "Xóa thẻ thành công!" });
        } else {
            res.status(200).json({ message: "Xóa thẻ thất bại" });
        }
    } catch (err) {
        res.status(401).json({ message: err });
    }
};
export default {
    findAllTag,
    createNewTag,
    findOneTag,
    destroyTag,
    updateTagStatus
}