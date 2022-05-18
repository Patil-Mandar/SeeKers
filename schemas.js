const Joi = require('joi');

module.exports.profileSchema = Joi.object({
    profile: Joi.object({
        name: Joi.string().required(),
        degree: Joi.string().required()
    }).required()
});