import jwt from "jsonwebtoken";
import configs from "../config/config";
import { TokenExpiration } from "../enums/tokenExpiration";
import IAuth from "../interfaces/auth";
import IUser from "../interfaces/user";

const signAccessToken = (payload: IAuth) => {
    return jwt.sign(payload, configs.serverToken.secretKey, { expiresIn: TokenExpiration.Access })
};

const signRefreshToken = (payload: IAuth) => {
    return jwt.sign(payload, configs.serverToken.refreshSecretKey, { expiresIn: TokenExpiration.Refresh })
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, configs.serverToken.refreshSecretKey);
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, configs.serverToken.secretKey);
};

export const buildTokens = (user: IUser) => {
    const accessPayload = { email: user.email };

    const accessToken = signAccessToken(accessPayload);
    const refreshToken = signRefreshToken(accessPayload);

    return { accessToken, refreshToken };
};