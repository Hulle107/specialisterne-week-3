import { authentication, authorization, decodeAuthorizationHeader, fetchAuthorizationHeader } from "@/lib/auth";
import { indexing } from "@/lib/database";
import { errorHandle } from "@/lib/error";
import { userFetchMany } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const index = indexing(request.nextUrl.searchParams);
        const token = await fetchAuthorizationHeader(request.headers);
        await authentication(token);

        let users = await userFetchMany(index);

        return NextResponse.json({ collection: users, count: users.length, next: index.next, previous: index.previous }, { status: 200 });
    }
    catch(error) {
        return errorHandle(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = await fetchAuthorizationHeader(request.headers);
        const auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'update', 'user');
    }
    catch(error) {
        return errorHandle(error);
    }
}