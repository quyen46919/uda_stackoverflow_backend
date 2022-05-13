export default interface IJWTResetPassword {
    password: string,
    iat: number;
    exp: number;
}