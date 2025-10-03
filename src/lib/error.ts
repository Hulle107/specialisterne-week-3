import { NextResponse } from "next/server";
import { MissingAuthorizationHeader, NotAuthenticated, NotAuthorized, SchemeNotSupported } from "./auth";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { PermitConnectionError, PermitPDPStatusError } from "permitio";
import { MySQLConnectionError } from "./database";

export class BadRequest extends Error {
    constructor(message: string, error?: Error) {
        super(message, error);
        this.name = 'BadRequest';
    }
}

export class MissingBodyField extends Error {
    constructor(message: string, error?: Error) {
        super(message, error);
        this.name = 'MissingBodyField';
    }
}

/**
 * Handle errors of known types.
 * @param error - The unknown error.
 * @returns The response as a promise, with error message and http status code.
 */
export function errorHandle(error: unknown): NextResponse<{ error: string; }> {
    if (error instanceof Error) {
        if (error.message) console.log(`Error: ${error.name} -`, error.message);
        else console.log(`Error: ${error.name}`);
    }

    if (error instanceof BadRequest) return NextResponse.json({ error: `Bad Request`, message: error.message }, { status: 400 });
    if (error instanceof MissingBodyField) return NextResponse.json({ error: `Bad Request`, message: error.message }, { status: 400 });
    if (error instanceof NotAuthenticated) return NextResponse.json({ error: `Bad Request`, message: error.message }, { status: 400 });
    if (error instanceof MissingAuthorizationHeader) return NextResponse.json({ error: `Unauthorized`, message: error.message }, { status: 401 });
    if (error instanceof SchemeNotSupported) return NextResponse.json({ error: `Unauthorized`, message: error.message }, { status: 401 });
    if (error instanceof JsonWebTokenError) return NextResponse.json({ error: `Unauthorized`, message: error.message }, { status: 401 });
    if (error instanceof NotBeforeError) return NextResponse.json({ error: `Unauthorized`, message: error.message }, { status: 401 });
    if (error instanceof TokenExpiredError) return NextResponse.json({ error: `Unauthorized`, message: error.message }, { status: 401 });
    if (error instanceof NotAuthorized) return NextResponse.json({ error: `Forbidden`, message: error.message }, { status: 403 });
    if (error instanceof PermitConnectionError) return NextResponse.json({ error: `Internal Server Error`, message: error.message }, { status: 500 });
    if (error instanceof PermitPDPStatusError) return NextResponse.json({ error: `Internal Server Error`, message: error.message }, { status: 500 });
    if (error instanceof MySQLConnectionError) return NextResponse.json({ error: `Internal Server Error`, message: error.message }, { status: 500 });

    return NextResponse.json({ error: `Internal Server Error` }, { status: 500 });
}