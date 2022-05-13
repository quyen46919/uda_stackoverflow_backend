import mysql from 'mysql';
import configs from './config';
import { Request, Response } from "express";

const params = {
    user: configs.mySQL.user,
    password: configs.mySQL.password,
    host: configs.mySQL.host,
    database: configs.mySQL.database,
    port: parseInt(configs.mySQL.port),
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

const Query = async <T>(connection: mysql.Connection, query: string) => new Promise<T>((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(result);
    });
});

const getConnectionAndQuery = <T>(query: string) => new Promise<T>((resolve, reject) => {
    Connect()
        .then((connection) => {
            Query<T>(connection, query)
                .then(result => resolve(result))
                .catch((err) => reject(err))
                .finally(() => {
                    connection.end();
                })
        })
        .catch((err) => reject(err));
});

export { Connect, Query, getConnectionAndQuery };