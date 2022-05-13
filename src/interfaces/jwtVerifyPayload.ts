export default interface IJWTVerifyPayload {
    email: string,
    iat: number;
    exp: number;
}