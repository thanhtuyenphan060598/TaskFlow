export class AppError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}

export function notFound(message: string) {
    return new AppError(404, message);
}

export function conflict(message: string) {
    return new AppError(409, message);
}

export function unauthorized(message: string) {
    return new AppError(401, message);
}