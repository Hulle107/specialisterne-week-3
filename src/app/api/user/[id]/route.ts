import { authentication, authorization, decodeAuthorizationHeader, fetchAuthorizationHeader } from "@/lib/auth";
import { errorHandle } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: RouteContext<'/api/user/[id]'>) {
    try {
        let { id } = await context.params;
        let token = await fetchAuthorizationHeader(request.headers);
        await authentication(token);
    }
    catch(error) {
        return errorHandle(error);
    }
}

export async function PATCH(request: NextRequest, context: RouteContext<'/api/user/[id]'>) {
    try {
        let { id } = await context.params;
        let token = await fetchAuthorizationHeader(request.headers);
        let auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'update', 'user');
    }
    catch(error) {
        return errorHandle(error);
    }
}

export async function DELETE(request: NextRequest, context: RouteContext<'/api/user/[id]'>) {
    try {
        let { id } = await context.params;
        let token = await fetchAuthorizationHeader(request.headers);
        let auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'delete', 'user');
    }
    catch(error) {
        return errorHandle(error);
    }
}