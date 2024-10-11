// const joi = require('@hapi/joi');
const joi = require('joi');

const registerValidation = (data)=>{

    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().email().min(6).required(),
        password: joi.string().min(8).required(),
        role:joi.string()
    });
    return schema.validate(data);
}

const loginValidation = (data)=>{
    const schema = joi.object({
        email: joi.string().email().min(6).required(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(data);
}

const eventValidation = (data)=>{
    const schema = joi.object({
        title: joi.string().min(6).required(),
        date: joi.date().required(),
        description: joi.string().min(8),
        availableTickets:joi.number()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;

module.exports.eventValidation = eventValidation;

