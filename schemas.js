const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports.profileSchema = Joi.object({
    profile: Joi.object({
        name: Joi.string().required(),
        mailID: Joi.string().required(),
        gender: Joi.string().required(),
        age:Joi.number().min(18).required(),
        currentLocation:Joi.string().required(),
        degree:Joi.string().required(),
        major:Joi.string().required(),
        jobExperience:Joi.number().min(0).required(),
        college:Joi.string().required(),
        skills:Joi.array().required(),
        jobHistory:Joi.array().optional()
    }).required()
});

module.exports.jobSchema = Joi.object({
    job: Joi.object({
        company:Joi.string().required(),
        mailID:Joi.string().required(),
        jobTitle:Joi.string().required(),
        location:Joi.string().required(),
        category:Joi.string().required(),
        type:Joi.string().required(),
        mode:Joi.string().required(),
        salary:Joi.number().min(0).required(),
        minAge:Joi.number().min(0).required(),
        minExperience:Joi.number().min(0).required(),
        reqDegree:Joi.array().required(),
        reqMajor:Joi.array().required(),
        reqSkills:Joi.array().required(),
        goodToHaveSkills:Joi.array().required()
    })
})