import { NextResponse } from "next/server";
import { MissingAuthorizationHeader, NotAuthorized, SchemeNotSupported } from "./auth";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { PermitConnectionError, PermitPDPStatusError } from "permitio";

/**
 * Handle errors of known types.
 * @param error - The unknown error.
 * @returns The response as a promise, with error message and http status code.
 */
export function errorHandle(error: unknown): NextResponse<{ error: string; }> {
    if (error instanceof Error) console.log(`Error: ${error.name} -`, error.message);

    if (error instanceof MissingAuthorizationHeader) return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
    if (error instanceof SchemeNotSupported) return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
    if (error instanceof JsonWebTokenError) return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
    if (error instanceof NotBeforeError) return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
    if (error instanceof TokenExpiredError) return NextResponse.json({ error: `Unauthorized` }, { status: 401 });
    if (error instanceof NotAuthorized) return NextResponse.json({ error: `Forbidden` }, { status: 403 });
    if (error instanceof PermitConnectionError) return NextResponse.json({ error: `Internal Server Error` }, { status: 500 });
    if (error instanceof PermitPDPStatusError) return NextResponse.json({ error: `Internal Server Error` }, { status: 500 });

    return NextResponse.json({ error: `Unknown Error` }, { status: 500 });
}