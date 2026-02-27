module.exports.successResponse = (status, message, result = null) => {
    return { status, error: false, message, result };
};

module.exports.errorResponse = (status, message) => {
    return { status, error: true, message };
};