export {}

declare global {
    namespace Express {
        interface Request {
            data: Object 
        }
    }
}
