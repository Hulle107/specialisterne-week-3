import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';

const connectionOptions: ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_NAME,
}

/**
 * Establish a connection with the MySQL server.
 * @returns The MySQL connection.
 */
export async function database(): Promise<Connection> {
    console.log(`MySQL: Establish connection`);
    return await mysql.createConnection(connectionOptions);
}

/**
 * Closing the connection with the MySQL server.
 * @param connection - The MySQL connection.
 * 
 * @todo Need to find a better way to close the connection.
 */
export async function close(connection: Connection) : Promise<void> {
    console.log(`MySQL: Closing connection`);
    return await connection.end();
}