import { getConnectionAndQuery } from "../config/database.config";
import IUser from "../interfaces/user";

export const checkValidEmail = async (email: string) => {
    if (!email) {
        throw new Error('Địa chỉ email không hợp lệ');
    }
    let query1 = `SELECT * FROM UDA_USERS WHERE email = '${email}' and status = 1`;
    const userList = await getConnectionAndQuery(query1) as IUser[];
    console.log(userList);
    return {
        isValidEmail: userList.length > 0,
        userList: userList
    };
};