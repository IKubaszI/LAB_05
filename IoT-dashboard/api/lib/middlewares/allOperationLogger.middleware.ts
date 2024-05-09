import { Request, Response, NextFunction } from 'express';

export function logMyOperationFromServer(request: Request, response: Response, next: NextFunction): void {
    const formattedDate = '(' + new Date().toLocaleTimeString() + ')';
    if (response.statusCode === 200) {
        console.log(`[${request.method} ${request.url}] ${formattedDate} The GET request was executed correctly: ${request.path}`);
    } else {
        console.log(`[${request.method} ${request.url}] ${formattedDate} The request has not been executed ${request.path}`);
    }
    next();
}