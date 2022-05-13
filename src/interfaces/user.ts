export default interface IUser {
    id: string,
    hash_password?: string;
    email: string;
    avatar: string;
    status: number;
    role: string;
    created_at: string;
    auth_token: string;
    auth_refresh_token: string;
    is_darkmode: string;
    language: string;
    disable_notification: string;
}

export function deletePassword(x: IUser) {
    delete x.hash_password; 
}