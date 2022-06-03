export default interface IAnswer {
    id: number;
    content: string;
    is_corrected: number;
    status: number;
    user_id: number;
    question_id: number;
    created_at: Date;
    updated_at: Date;
}