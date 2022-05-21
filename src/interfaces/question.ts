export default interface IQuestion {
    id: number,
    title: string,
    content: string,
    is_resolved: number,
    team_id: number | null,
    created_at: Date,
    updated_at: Date,
    status: number,
    user_id: number
};