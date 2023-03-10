export class CError extends Error {
    constructor(public message: string, public code: number) {
        super(message)
    }
}