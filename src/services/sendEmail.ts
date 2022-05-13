import nodemailer from 'nodemailer';
import configs from '../config/config';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import SMTPPool from 'nodemailer/lib/smtp-pool';

const OAuth2 = google.auth.OAuth2;
const OAuth2Client = new OAuth2(configs.googleService.clientId, configs.googleService.clientSecret);
OAuth2Client.setCredentials({ refresh_token: configs.googleService.clientRefreshToken });

const sendEmail = async (email: string) => {
    const accessToken = OAuth2Client.getAccessToken();

    const smtpConfig: SMTPPool.Options = {
        host: 'smtp.gmail.com',
        port: Number(465) || 0,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: configs.emailAccount.username,
            clientId: configs.googleService.clientId,
            clientSecret: configs.googleService.clientSecret,
            refreshToken: configs.googleService.clientRefreshToken,
            accessToken: String(accessToken)
        },
        pool: true,
    };

    const transport = nodemailer.createTransport(smtpConfig);
    console.log(configs.emailAccount.username, configs.emailAccount.password);
    
    try {
        const emailToken = await jwt.sign(
            { email: email },
            configs.emailAccount.secret,
            { expiresIn: configs.emailAccount.expireTime }
        );
        const url = `http://localhost:5000/api/v1/auth/confirmation/${emailToken}`;

        await transport.sendMail({
            from: configs.emailAccount.username,
            to: email,
            subject: "Xác thực tài khoản bạn đã đăng ký trên UDA Stackoverflow",
            text: `Để tiến hành xác thực tài khoản, vui lòng nhấn vào đường link: ${url}`,
            html: `<p>Để tiến hành xác thực tài khoản, vui lòng nhấn vào đường link: <br/> ${url}</p>`,
        });
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Gửi email thất bại!');
    }
};

export default sendEmail;