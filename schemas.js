const Joi = require('joi');

module.exports.profileSchema = Joi.object({
    profile: Joi.object({
        name: Joi.string().required(),
        mailID: Joi.string().required(),
        gender: Joi.string().required(),
        age:Joi.number().required(),
        currentLocation:Joi.string().required(),
        degree:Joi.string().required(),
        major:Joi.string().required(),
        jobExperience:Joi.number().required(),
        college:Joi.string().required(),
        skills:Joi.array().required(),
        jobHistory:Joi.array().optional()
    }).required()
});