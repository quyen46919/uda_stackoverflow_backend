export default interface IMySQLUpdateResult {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: Boolean,
    changedRows: number
}