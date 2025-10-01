import { authentication, authorization, decodeAuthorizationHeader, fetchAuthorizationHeader } from "@/lib/auth";
import { errorHandle } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "GET: list of cereals" }, { status: 200 });
}

export async function POST(request: NextRequest) {
    try {
        let token = await fetchAuthorizationHeader(request.headers);
        let auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'create', 'cereal');
    }
    catch(error) {
        return errorHandle(error);
    }
}