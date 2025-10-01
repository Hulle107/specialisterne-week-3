export function jwtSecret(): string {
    let secret = process.env.JWT_SECRET;
    if (!secret) console.warn(`JSONWebToken: Missing enviroment secret`);

    return secret || 'MissingEnviromentSecret';
}