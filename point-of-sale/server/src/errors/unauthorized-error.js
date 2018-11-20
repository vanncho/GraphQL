class UnauthorizedError extends Error {

    constructor(message) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message || 'You are not authorized! Please login.';
        this.status = 401;
    }
}

module.exports = UnauthorizedError;