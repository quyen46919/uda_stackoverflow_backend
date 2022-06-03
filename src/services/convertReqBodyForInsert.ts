import mysql from 'mysql2';

export const convertReqBodyForInsert = (reqBody: any) => {
    const names = [];
    const values = [];
    for (const prop in reqBody) {
        names.push(prop);
        // console.log(reqBody[prop]);
        // console.log(typeof reqBody[prop]);
        values.push(
            reqBody[prop] !== "" && reqBody[prop] !== null
                ? mysql.escape(reqBody[prop])
                : isNaN(reqBody[prop]) ? mysql.escape(reqBody[prop]) : "NULL"
        );
    }
    const joinedNames = names.join(", ");
    const joinedValues = values.join(", ");
    return {
        names: joinedNames,
        values: joinedValues
    };
}