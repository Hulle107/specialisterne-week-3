import { authentication, authorization, decodeAuthorizationHeader, fetchAuthorizationHeader } from "@/lib/auth";
import { errorHandle } from "@/lib/error";
import { userDelete, userFetch, userUpdate } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: RouteContext<'/api/user/[id]'>) {
    try {
        const { id } = await context.params;
        const token = await fetchAuthorizationHeader(request.headers);
        await authentication(token);

        let user = await userFetch(id);
        
        return NextResponse.json({ user }, { status: 200 });
    }
    catch(error) {
        return errorHandle(error);
    }
}

export async function PATCH(request: NextRequest, context: RouteContext<'/api/user/[id]'>) {
    try {
        const { id } = await context.params;
        const token = await fetchAuthorizationHeader(request.headers);
        const auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'update', 'user');
        
        const data = await request.json();
        
        await userUpdate(id, data);

        return NextResponse.json({ message: 'User has been updated' }, { status: 202 });
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
        await userDelete(id);

        return NextResponse.json({ message: 'User has been deleted' }, { status: 202 });
    }
    catch(error) {
        return errorHandle(error);
    }
}