import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';

const connectionOptions: ConnectionOptions = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
}

export class MySQLConnectionError extends Error {
    constructor(message: string, error?: Error) {
        super(message, error);
        this.name = 'MySQLConnectionError';
    }
}

export type Index = {
    page: number;
    count: number;
    offset: string;
    limit: string;
    next: string;
    previous?: string;
}

/**
 * Establish a connection with the MySQL server.
 * @returns The MySQL connection.
 */
export async function openDatabase(): Promise<Connection> {
    try {
        console.log(`MySQL: Establish connection`);
        return await mysql.createConnection(connectionOptions);
    }
    catch(error) {
        throw new MySQLConnectionError('Could not connect to database');
    }
}

/**
 * Closing the connection with the MySQL server.
 * @param connection - The MySQL connection.
 * 
 * @todo Need to find a better way to close the connection.
 */
export async function closeDatabase(connection: Connection) : Promise<void> {
    console.log(`MySQL: Closing connection`);
    return await connection.end();
}

export function indexing(search: URLSearchParams): Index {
    const pageParam = search.get('page');
    const countParam = search.get('count');
    let page = pageParam !== null && Number.parseInt(pageParam) ? Number.parseInt(pageParam) : 1;
    let count = countParam !== null && Number.parseInt(countParam) ? Number.parseInt(countParam) : 10;

    if (page < 1) page = 1;
    if (count < 1) count = 1;

    let next = `?page=${page+1}&count=${count}`;
    let previous = page > 1 ? `?page=${page-1}&count=${count}` : undefined;
    let offset = `${(page - 1) * count}`;
    let limit = `${count}`;

    return {
        page,
        count,
        offset,
        limit,
        next,
        previous,
    }
}