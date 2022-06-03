import nodemailer from 'nodemailer';
import configs from '../config/config';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import SMTPPool from 'nodemailer/lib/smtp-pool';

const sendEmailResetPassword = async (email: string) => {
    const OAuth2 = google.auth.OAuth2;
    const OAuth2Client = new OAuth2(configs.googleService.clientId, configs.googleService.clientSecret, configs.googleService.redirectUrl);
    OAuth2Client.setCredentials({ refresh_token: configs.googleService.clientRefreshToken });
    const accessToken = OAuth2Client.getAccessToken();

    const smtpConfig: SMTPPool.Options = {
        service: 'gmail',
        // host: 'smtp.gmail.com',
        // port: Number(465) || 0,
        // secure: true,
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
        const newPassword = Math.random().toString(36).slice(-10);
        const emailToken = await jwt.sign(
            { password: newPassword },
            configs.emailAccount.secret,
            { expiresIn: configs.emailAccount.resetPasswordExpireTime }
        );
        const url = `${configs.serverVar.serverEndpoint}/api/v1/auth/reset-password/${emailToken}`;

        await transport.sendMail({
            from: configs.emailAccount.username,
            to: email,
            subject: "Xác thực yêu cầu thay đổi mật khẩu",
            text: `Bạn đã yêu cầu thay đổi mật khẩu tài khoản UDA Stackoverflow, nhấn vào đường link sau để chuyển đến trang đổi mật khẩu: ${url}`,
            html: `<p>Bạn đã yêu cầu thay đổi mật khẩu tài khoản UDA Stackoverflow. <br/> Mật khẩu mới của bạn là <b>${newPassword}</b>, nếu bạn chắc muốn đổi mật khẩu hiện tại thành mật khẩu mới này, hãy nhấn vào đường link sau để xác nhận. Nếu không, hãy bỏ qua tin nhắn này:<br/> ${url}</p>`,
        });
        
        return emailToken;
    } catch (error) {
        console.log(error);
        throw new Error('Gửi email thất bại!');
    }
};

export default sendEmailResetPassword;