class ApiError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number = 500) {
        super(message)
        this.message = message
        this.statusCode = statusCode

        Error.captureStackTrace(this, ApiError)
    }
}

export default ApiError
