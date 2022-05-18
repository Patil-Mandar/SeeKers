const {profileSchema} = require('./schemas')

module.exports.validateProfile = (req, res, next) => {
    const { error } = profileSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}