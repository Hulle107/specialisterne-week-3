import { hashPassword } from "@/lib/crypto";
import { openDatabase, closeDatabase, Index } from "@/lib/database";
import { BadRequest } from "@/lib/error";

export type User = {
    username: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
}

export type FetchedUser = User & { id: string }
export type UpdateUser = Partial<User>
 
export async function userFetchMany(index: Index): Promise<FetchedUser[]> {
    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'SELECT * FROM `user` LIMIT ?, ?',
        [index.offset, index.limit]
    );
    
    await closeDatabase(db);

    let users = results as FetchedUser[];
    return users;
}

export async function userFetch(id: string): Promise<FetchedUser> {
    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'SELECT * FROM `user` WHERE `id`=?',
        [id]
    );

    await closeDatabase(db);

    let users = results as FetchedUser[];
    let user = users[0];

    return user;
}

export async function userCreate(newUser: unknown): Promise<void> {
    if (!verifyUser(newUser)) throw new BadRequest('Bad user data given');

    let username = `${newUser.username}`;
    let email = `${newUser.email}`;
    let password = `${hashPassword(newUser.password)}`;
    let firstname = `${newUser.firstname ?? null}`;
    let lastname = `${newUser.lastname ?? null}`;

    const db = await openDatabase();
    const [results, fields] = await db.execute(
        'INSERT INTO `user` (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)',
        [username, email, password, firstname, lastname]
    );

    await closeDatabase(db);

    return;
}

export async function userUpdate(id: string, updateUser: unknown): Promise<void> {
    if (!verifyUpdateUser(updateUser)) throw new BadRequest('Bad update user data given');

    let username = updateUser.username ? `${updateUser.username}` : undefined;
    let email = updateUser.email ? `${updateUser.email}` : undefined;
    let password = updateUser.password ? `${hashPassword(updateUser.password)}` : undefined;
    let firstname = updateUser.firstname ? `${updateUser.firstname}` : undefined;
    let lastname = updateUser.lastname ? `${updateUser.lastname}`: undefined;

    const db = await openDatabase();
    const [results, fields] = await db.execute(
        'UPDATE `user` SET `username`=?, `email`=?, `password`=?, `firstname`=?, `lastname`=? WHERE `id`=?',
        [username, email, password, firstname, lastname, id]
    );

    await closeDatabase(db);

    return;
}

export async function userDelete(id: string): Promise<void> {
    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'DELETE FROM `user` WHERE `id`=?',
        [id]
    );

    await closeDatabase(db);

    return;
}

export function verifyUser(user: unknown): user is User {
    if (user === undefined || user === null) return false;
    if (typeof user !== 'object') return false;

    if (!('username' in user)) return false;
    if (typeof user.username !== 'string') return false;
    if (user.username.length > 128) return false;

    if (!('email' in user)) return false;
    if (typeof user.email !== 'string') return false;
    if (user.email.length > 256) return false;

    if (!('password' in user)) return false;
    if (typeof user.password !== 'string') return false;
    if (user.password.length > 1024) return false;

    if ('firstname' in user) {
        if (typeof user.firstname !== 'string' && typeof user.firstname !== 'undefined') return false;
        if (typeof user.firstname === 'string' && user.firstname.length > 45) return false;
    }

    if ('lastname' in user) {
        if (typeof user.lastname !== 'string' && typeof user.lastname !== 'undefined') return false;
        if (typeof user.lastname === 'string' && user.lastname.length > 45) return false;
    }

    return true;
}

export function verifyUpdateUser(user: unknown): user is UpdateUser {
    if (user === undefined || user === null) return false;
    if (typeof user !== 'object') return false;

    if ('username' in user) {
        if (typeof user.username !== 'string' && typeof user.username !== 'undefined') return false;
        if (typeof user.username === 'string' && user.username.length > 128) return false;
    }

    if ('email' in user) {
        if (typeof user.email !== 'string' && typeof user.email !== 'undefined') return false;
        if (typeof user.email === 'string' && user.email.length > 256) return false;
    }

    if ('password' in user) {
        if (typeof user.password !== 'string' && typeof user.password !== 'undefined') return false;
        if (typeof user.password === 'string' && user.password.length > 1024) return false;
    }

    if ('firstname' in user) {
        if (typeof user.firstname !== 'string' && typeof user.firstname !== 'undefined') return false;
        if (typeof user.firstname === 'string' && user.firstname.length > 45) return false;
    }

    if ('lastname' in user) {
        if (typeof user.lastname !== 'string' && typeof user.lastname !== 'undefined') return false;
        if (typeof user.lastname === 'string' && user.lastname.length > 45) return false;
    }

    return true;
}