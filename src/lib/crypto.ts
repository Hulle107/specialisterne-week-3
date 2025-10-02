import { pbkdf2Sync, randomBytes } from "crypto";

const digest = 'sha512';
const keylength = 64;
const iterations = 100000;

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, iterations, keylength, digest).toString('hex');

    return `${salt}:${hash}`;
}

export function verifyPassword(combination: string, password: string): boolean {
    const parts = combination.split(':');
    const salt = parts[0];
    const hash = parts[1];

    let unknownHash = pbkdf2Sync(password, salt, iterations, keylength, digest).toString('hex');

    return unknownHash === hash;
}