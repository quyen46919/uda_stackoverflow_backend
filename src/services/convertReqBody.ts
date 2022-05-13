export const convertReqBody = (reqBody: any) => {
    const arr = [];
    for (const prop in reqBody) {
        arr.push(`${prop} = "${reqBody[prop]}"`);
    }
    const subQuery = arr.join(", ");
    return subQuery;
}