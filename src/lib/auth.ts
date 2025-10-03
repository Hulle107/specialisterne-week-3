import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { permit } from "./permit";
import { Context } from "permitio";
import { jwtSecret } from "./jwt";

export class MissingAuthorizationHeader extends Error {
    constructor(message: string, error?: Error) {
        super(message, error);
        this.name = 'MissingAuthorizationHeader';
    }
}

export class SchemeNotSupported extends Error {
    constructor(message: string, error?: Error) {
        super(message, error);
        this.name = 'SchemeNotSupported';
    }
}

export class NotAuthorized extends Error {
    constructor(message: string, error?: Error) {
        super(message, error);
        this.name = 'NotAuthorized';
    }
}

export class NotAuthenticated extends Error {
    constructor(message: string, error?: Error) {
        super(message, error);
        this.name = 'NotAuthenticated';
    }
}

/**
 * A `authorization` object.
 */
export type Authorization = {
    type: string;
    credentials: string;
}

/**
 * A JSON Web Token payload as a `AuthUser`.
 */
export type AuthUser = {
    username: string;
    email: string;
    firstname?: string;
    lastname?: string;
}

/**
 * Fetch the `authorization` header as an object with `type` and `credentials`.
 * @param headers - The headers from the request.
 * @returns The object with `type` and `credentials`.
 * @throws {@link MissingAuthorizationHeader} if there is no authorization header set, or empty.
 * @throws {@link SchemeNotSupported} if the scheme given is not of type 'Bearer'.
 */
export async function fetchAuthorizationHeader(headers: Headers): Promise<Authorization> {
    let header = headers.get('Authorization');
    if (!header) throw new MissingAuthorizationHeader('Missing Authorization header');

    let data = header.split(' ');
    let type = data[0];
    let credentials = data[1];
    if (type !== 'Bearer') throw new SchemeNotSupported(`${type} Scheme not supported`);

    return {
        type,
        credentials,
    }
}

/**
 * Decode the `authorization` header.
 * @param authorization - The authorization object.
 * @returns The payload as a `AuthUser`.
 * @throws {@link JsonWebTokenError} if the token given is invalid.
 */
export async function decodeAuthorizationHeader(authorization: Authorization): Promise<AuthUser> {
    let payload = jwt.decode(authorization.credentials) as JwtPayload | null;
    if (!payload) throw new JsonWebTokenError('invalid token');

    return {
        username: payload['username'],
        email: payload['email'],
        firstname: payload['firstname'],
        lastname: payload['lastname'],
    }
}

/**
 * Check if the token been given is valid.
 * @param authorization - The authorization object.
 * @throws {@link JsonWebTokenError} if the token given is invalid.
 * @throws {@link NotBeforeError} if current time is before the `nbf` claim.
 * @throws {@link TokenExpiredError} if current time is after the `exp` cleam.
 */
export async function authentication(authorization: Authorization): Promise<void> {
    jwt.verify(authorization.credentials, jwtSecret());
    return;
}

/**
 * Checks if a `user` is authorized to perform an `action` on a `resource` within the specified context.
 * @param user - The user object representing the user.
 * @param action - The action to be performed on the resource.
 * @param resource - The resource object representing the resource.
 * @param context - The context object representing the context in which the action is performed.
 * @throws {@link NotAuthorized} if a `user` is not authorized to perform an `action` on a `resource` within the specified context.
 * @throws {@link PermitConnectionError} if an error occurs while sending the authorization request to the PDP.
 * @throws {@link PermitPDPStatusError} if received a response with unexpected status code from the PDP.
 */
export async function authorization(user: AuthUser, action: string, resource: string, context?: Context): Promise<void> {
    let isAuthorized = await permit.check(user.username, action, resource, context);
    if (!isAuthorized) throw new NotAuthorized(`${user.username} Not authorized to perform ${action} on ${resource}`);

    return;
}

/**
 * Create a `authorization` header with a JSONWebToken.
 * @param headers - The headers from the request.
 * @param user - The user object representing the user.
 * @returns The token generated.
 */
export async function createAuthorizationHeader(headers: Headers, user: AuthUser): Promise<string> {
    let token = jwt.sign(user, jwtSecret());
    headers.set('Authorization', `Bearer ${token}`);
    return token;
}