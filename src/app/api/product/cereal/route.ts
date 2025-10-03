import { authentication, authorization, decodeAuthorizationHeader, fetchAuthorizationHeader } from "@/lib/auth";
import { indexing } from "@/lib/database";
import { errorHandle } from "@/lib/error";
import { cerealCreate, cerealFetchMany } from "@/models/cereal.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const index = indexing(request.nextUrl.searchParams);

    let cereals = await cerealFetchMany(index);

    return NextResponse.json({ collection: cereals, count: cereals.length, next: index.next, previous: index.previous }, { status: 200 });
}

export async function POST(request: NextRequest) {
    try {
        const token = await fetchAuthorizationHeader(request.headers);
        const auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'create', 'cereal');
        
        const data = await request.json();
        
        await cerealCreate(data);

        return NextResponse.json({ message: 'New cereal has been created' }, { status: 201 });
    }
    catch(error) {
        return errorHandle(error);
    }
}