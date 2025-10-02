import { authentication, authorization, decodeAuthorizationHeader, fetchAuthorizationHeader } from "@/lib/auth";
import { errorHandle } from "@/lib/error";
import { cerealFetch } from "@/models/cereal.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: RouteContext<'/api/product/cereal/[id]'>) {
    const { id } = await context.params;

    let cereal = await cerealFetch(id);

    return NextResponse.json({ cereal }, { status: 200 });
}

export async function PATCH(request: NextRequest, context: RouteContext<'/api/product/cereal/[id]'>) {
    try {
        const { id } = await context.params;
        const token = await fetchAuthorizationHeader(request.headers);
        const auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'update', 'cereal');
    }
    catch(error) {
        return errorHandle(error);
    }
}

export async function DELETE(request: NextRequest, context: RouteContext<'/api/product/cereal/[id]'>) {
    try {
        const { id } = await context.params;
        const token = await fetchAuthorizationHeader(request.headers);
        const auth = await decodeAuthorizationHeader(token);
        await authentication(token);
        await authorization(auth, 'delete', 'cereal');
    }
    catch(error) {
        return errorHandle(error);
    }
}