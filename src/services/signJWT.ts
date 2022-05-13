import jwt from "jsonwebtoken";
import configs from "../config/config";
import { TokenExpiration } from "../enums/tokenExpiration";
import IAuth from "../interfaces/auth";
import IUser from "../interfaces/user";

// const signJWT = (user: IAuth, callback: (error: Error | null, token: string | null) => void): void => {
//     let timeSinchEpoch = new Date().getTime();
//     let expirationTime = timeSinchEpoch + Number(configs.serverToken.expireTime) * 100000;
//     let expirationTimeInSecond = Math.floor(expirationTime / 1000);

//     try {
//         jwt.sign({
//             username: user.email,
//             password: user.password
//         }, 
//         configs.serverToken.secretKey,
//         {
//             issuer: configs.serverToken.issuer,
//             algorithm: "HS256",
//             expiresIn: expirationTimeInSecond
//         },
//         (error, token) => {
//             if (error) callback(error, null);
//             if (token) callback(null, token);
//         })
//     } catch (error) {
//         callback(error, null);
//     }
// };

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