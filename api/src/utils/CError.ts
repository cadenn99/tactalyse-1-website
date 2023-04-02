/**
 * Custom error function with error code
 * 
 */
export class CError extends Error {
    constructor(public message: string, public code: number) {
        super(message)
    }
}