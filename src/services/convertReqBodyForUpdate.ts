import mysql from 'mysql2';

export const convertReqBodyForUpdate = (reqBody: any) => {
    const arr = [];
    for (const prop in reqBody) {
        arr.push(`${prop} = ${mysql.escape(reqBody[prop])}`);
    }
    const subQuery = arr.join(", ");
    return subQuery;
}