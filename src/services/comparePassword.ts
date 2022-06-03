import bcryptjs from 'bcryptjs';

export const comparePassword = async (reqPassword: string, comparePassword: string) => {
    console.log('reqPassword = ', reqPassword);
    console.log('comparePassword = ', comparePassword);
    const result = await bcryptjs.compare(reqPassword, comparePassword);
    console.log('result =', result);
    return result;
}