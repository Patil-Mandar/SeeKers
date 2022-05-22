const {profileSchema} = require('./schemas')
const ExpressError = require('./utils/ExpressError')


module.exports.validateProfile = (req, res, next) => {
    const { error } = profileSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        throw new ExpressError('Login First', 401)

    }
}

module.exports.createdProfile = (req,res,next)=>{
    if(req.user.profile){
        next();
    }else{
        throw new ExpressError('You need to complete the Profile first',401)
    }
}