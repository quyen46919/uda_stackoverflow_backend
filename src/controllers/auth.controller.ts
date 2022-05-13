import { Request, Response } from "express";
import { getConnectionAndQuery } from "../config/database.config";
import bcryptjs from 'bcryptjs';
import IUser from "../interfaces/user";
import { deletePassword } from "../interfaces/user";
import sendEmail from "../services/sendEmail";
import jwt from 'jsonwebtoken';
import configs from "../config/config";
import IJWTVerifyPayload from "../interfaces/jwtVerifyPayload";
import { buildTokens, verifyRefreshToken } from "../services/signJWT";
import sendEmailResetPassword from "../services/sendEmailResetPassword";
import IJWTResetPassword from "../interfaces/jwtResetPassword";
import { hashPassword } from "../services/hashPassword";
import { checkValidEmail } from "../services/checkValidEmail";

const confirmEmailToken = async (req: Request, res: Response) => {
    try {
        const emailToken = req.params.emailToken;
        const { email } = jwt.verify(emailToken, configs.emailAccount.secret) as IJWTVerifyPayload;
        let query = `UPDATE UDA_USERS SET status = 1 WHERE email = '${email}';`
        const updateResult = await getConnectionAndQuery(query);

        if (updateResult) {
            return res.redirect('https://www.facebook.com/');
            // res.status(200).json({ message: 'Xác thực tài khoản thành công thành công' });
        }
        console.log('updateResult =', updateResult);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const logup = async (req: Request, res: Response) => {
    try {
        let { username, password, email } = req.body;

        let query1 = `SELECT * FROM UDA_USERS WHERE email = '${email}'`;
        const userList = await getConnectionAndQuery(query1) as IUser[];
        if (userList[0]) res.status(400).json({ message: 'Địa chỉ email đã tồn tại!' });

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        let query = `INSERT INTO UDA_USERS (email, username, hash_password) VALUES ("${email}", "${username}", "${hashPassword}")`;
        await getConnectionAndQuery(query);
        const sendEmailResult = await sendEmail(email);
        if (sendEmailResult) {
            res.status(200).json({ message: 'Tạo mới tài khoản thành công! Hãy kiểm tra email để xác thực tài khoản' });
        } else {
            res.status(404).json({ message: 'Gửi email xác nhận tới tài khoản thất bại' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        let { password, email } = req.body;
        let query = `SELECT * FROM UDA_USERS WHERE email = "${email}" AND status = 1`;
        const userList = await getConnectionAndQuery(query) as IUser[];
        const user = userList[0] as IUser;
        
        if (user?.status !== 1) {
            return res.status(400).json({ 
                message: 'Tài khoản chưa được xác thực email. Vui lòng kiểm tra email để xác thực tài khoản!' 
            });
        }
        if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại!' });

        const isCorrectPassword = await bcryptjs.compare(password, user?.hash_password || '');
        if (!isCorrectPassword) return res.status(400).json({ message: 'Mật khẩu không chính xác!' });

        const token = buildTokens(user);
        deletePassword(user);
        if (token) res.status(200).json({
            token,
            user: user
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const refreshToken = async (req: Request, res: Response) => {
    try {
        let refreshToken = req.body.refreshToken;
        const { email } = verifyRefreshToken(refreshToken) as IJWTVerifyPayload;
        
        let query = `SELECT * FROM UDA_USERS WHERE email = '${email}'`;
        const user: IUser = await getConnectionAndQuery(query);

        if (!user) res.status(401).json({ message: 'Tài khoản không tồn tại' });

        const token = buildTokens(user);
        if (token) res.status(200).json({ token });

    } catch (err) {
        res.status(401).json({ message: err });
    }
};

const forgotPassword = async (req: Request, res: Response) => { 
    try {
        const email = req.body.email as string;
        const { isValidEmail } = await checkValidEmail(email);
        if (!isValidEmail) res.status(400).json({ message: "Địa chỉ email không tồn tại" });

        const emailToken = await sendEmailResetPassword(email);
        if (emailToken) {
            let query = `UPDATE UDA_USERS SET reset_password_token = '${emailToken}' WHERE email = '${email}'`;
            await getConnectionAndQuery(query);
            res.status(200).json({ message: 'Gửi mã xác nhận đổi mật khẩu thành công, vui lòng kiểm tra email để thực hiện đổi mật khẩu' });
        } else {
            res.status(500).json({ message: 'Gửi email thất bại, vui lòng thử lại sau' });
        }
    } catch (err) {
        res.status(401).json({ message: err });
    }
}

const resetPassword = async (req: Request, res: Response) => { 
    const emailToken = req.params.emailToken as string;
    const { password , exp } = jwt.verify(emailToken, configs.emailAccount.secret) as IJWTResetPassword;
    if(exp < new Date().getTime()/1000){
        return res.status(400).json({ message: "Yêu cầu xác nhận đổi mật khẩu đã quá hạn" });
    }

    console.log('in here 1');
    let query = `SELECT * FROM UDA_USERS WHERE reset_password_token = '${emailToken}'`;
    const userList = await getConnectionAndQuery(query) as IUser[];
    const user = userList[0];
    if (user) {
        const hashedPassword = await hashPassword(password);
        let query = `UPDATE UDA_USERS SET hash_password = '${hashedPassword}', reset_password_token = NULL WHERE id = ${user.id}`;
        console.log('in here 2');
        await getConnectionAndQuery(query);
        res.status(200).json({ message: 'Cập nhật mật khẩu thành công!' });
    } else {
        console.log('in here 3');
        res.status(400).json({ message: 'Cập nhật mật khẩu thất bại, vui lòng thử lại sau!' });
    }
}

export default {
    logup,
    login,
    confirmEmailToken,
    refreshToken,
    forgotPassword,
    resetPassword
}