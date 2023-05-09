


const restrictTo = async (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Error('You do not have permission to perform this action')
        }
        next()
    }
}