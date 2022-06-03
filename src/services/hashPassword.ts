import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const hashPassword = await bcryptjs.hash(password, 10);
    return hashPassword;
}