import mysql from 'mysql2';

export const convertArrayToInsertTempTable = (id: number, list: number[] | string[]) => {
    const arr: any = [];
    list.forEach((tag: number | string) => {
        arr.push(`(${id}, ${mysql.escape(tag)})`);
    });
    const response = arr.join(", ");
    return response;
};