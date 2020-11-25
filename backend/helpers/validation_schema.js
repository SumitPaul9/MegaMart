import Joi from 'joi';

export const signupSchema = Joi.object({
    firstName: Joi.string()
            .min(5)
            .max(20)
            .required(),
        
    lastName: Joi.string()
            .min(5)
            .max(20)
            .required(),
    
    username: Joi.string()
            .required()
            .min(3),
    
    password: Joi.string()
            .min(8)
            .required(),

    email: Joi.string()
            .email()
            .lowercase()
            .required(),
    
    role: Joi.string()
            .required(),

    contactnumber: Joi.string()
            .required()
            .min(10),  

})

export const loginSchema = Joi.object({
    
    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
            .min(8)
            .required()
})