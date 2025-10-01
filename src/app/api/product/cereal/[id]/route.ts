import { authentication, authorization, decodeAuthorizationHeader, fetchAuthorizationHeader } from "@/lib/auth";
import { errorHandle } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: RouteContext<'/api/product/cereal/[id]'>) {
    let { id } = await context.params;
    
    return NextResponse.json({ message: `GET: cereal with id of ${ id }` }, { status: 200 });
}

export async function PATCH(request: NextRequest, context: RouteContext<'/api/product/cereal/[id]'>) {
    try {
        let { id } = await context.params;
        let token = await fetchAuthorizationHeader(request.headers);
        let auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'update', 'cereal');
    }
    catch(error) {
        return errorHandle(error);
    }
}

export async function DELETE(request: NextRequest, context: RouteContext<'/api/product/cereal/[id]'>) {
    try {
        let { id } = await context.params;
        let token = await fetchAuthorizationHeader(request.headers);
        let auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'delete', 'cereal');
    }
    catch(error) {
        return errorHandle(error);
    }
}