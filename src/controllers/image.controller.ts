import { Request, Response } from "express";
import configs from "../config/config";
import { getConnectionAndQuery } from "../config/database.config";
import IMySQLResult from "../interfaces/MySQLResult";

const saveImageToDatabase = async (file: Express.Multer.File): Promise<IMySQLResult> => {
    console.log(file);
    const imageUrl = `${configs.serverVar.serverEndpoint}/public/images/${file?.filename}`;
    let query = `
        INSERT INTO uda_images(image_url, image_name) 
        VALUES ('${imageUrl}', '${file?.originalname}')`;
    let result: IMySQLResult = await getConnectionAndQuery(query);
    return result;
}

const uploadSingleImage = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    const result = await saveImageToDatabase(file);
    if (result.affectedRows === 0) {
        return res.status(400).json({ message: 'Upload ảnh thất bại' });
    } else {
        return res.status(200).json({
            message: 'Tải ảnh lên thành công',
            imageUrl: `${configs.serverVar.serverEndpoint}/public/images/${file?.filename}`
        });
    }
};

const getImage = async (req: Request, res: Response) => {
    const filename = req.params.filename;
    const filePath = `public/images/${filename}`;
    console.log('filePath =', filePath);
    res.status(200).sendFile(filePath);
};

const uploadMultipleImages = async (req: Request, res: Response) => {
    const fileList: any = req.files;
    const uploadPromise = fileList.map(async (file: Express.Multer.File) => await saveImageToDatabase(file));

    await Promise.all(uploadPromise)
        .then((values) => {
            const uploadSuccessImageCount = values.filter((result) => result.affectedRows === 1);
            if (uploadSuccessImageCount.length === fileList.length) {
                let imageUrls: Array<string> = [];
                fileList.forEach((file: Express.Multer.File) => {
                    imageUrls.push(`${configs.serverVar.serverEndpoint}/public/images/${file?.filename}`);
                });
                res.status(200).json({ message: 'Tải ảnh lên thành công', urls: imageUrls });
            } else {
                res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình tải ảnh lên' });
            }
        })
        .catch(() => res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình tải ảnh lên' }));
};

export default {
    uploadSingleImage,
    getImage,
    uploadMultipleImages
};