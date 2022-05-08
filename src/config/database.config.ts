import mysql from 'mysql';
import { MYSQL } from './config';
import { Request, Response } from "express";

const params = {
    user: MYSQL.user,
    password: MYSQL.password,
    host: MYSQL.host,
    database: MYSQL.database
};

const Connect = async () => new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);

    connection.connect((error) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(connection);
    });
});

const Query = async (connection: mysql.Connection, query: string) => new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(result);
    })
});

const getConnectionAndQuery = (req: Request, res: Response, query: string) => {
    Connect()
    .then((connection) => {
        Query(connection, query)
            .then(result => res.send(result))
            .catch((err) => res.status(500).json({ message: err.message }))
            .finally(() => {
                connection.end();
            })
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

export { Connect, Query, getConnectionAndQuery };