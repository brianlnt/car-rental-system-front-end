export class CustomError extends Error {
    constructor(
        public status: number,
        message: string,
        public detail?: string
    ) {
        super(message);
    }
}
