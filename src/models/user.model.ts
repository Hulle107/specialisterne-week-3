import { openDatabase, closeDatabase, Index } from "@/lib/database";

export type User = {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
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
export async function userCreate(newUser: User): Promise<void> {}
export async function userUpdate(id: string, updateUser: UpdateUser): Promise<void> {}
export async function userDelete(id: string): Promise<void> {}