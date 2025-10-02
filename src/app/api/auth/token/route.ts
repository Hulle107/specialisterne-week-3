import { AuthUser, createAuthorizationHeader, NotAuthenticated } from "@/lib/auth";
import { verifyPassword } from "@/lib/crypto";
import { closeDatabase, openDatabase } from "@/lib/database";
import { errorHandle, MissingBodyField } from "@/lib/error";
import { FetchedUser } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        if (!data['email']) throw new MissingBodyField('Missing `email` field');
        if (!data['password']) throw new MissingBodyField('Missing `password` field');

        const email = data['email'];
        const password = data['password'];

        let db = await openDatabase();
        const [results, fields] = await db.execute(
            'SELECT * FROM `user` WHERE `email`=?',
            [email]
        );
    
        await closeDatabase(db);

        let users = results as FetchedUser[];
        let user = users[0];

        if (users.length === 0) throw new NotAuthenticated('Wrong login credentials');
        if (!verifyPassword(user.password, password)) throw new NotAuthenticated('Wrong login credentials');

        let auth: AuthUser = {
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        }
        let token = await createAuthorizationHeader(request.headers, auth);

        return NextResponse.json({ token }, { status: 200 });
    }
    catch (error) {
        return errorHandle(error);
    }
}