import {loginSchema, signupSchema} from '../helpers/validation_schema.js'
import { User } from '../models/user.js';
import createError from 'http-errors';
export const signup = async (req, res, next)=>{

    try {
        const result = await signupSchema.validateAsync(req.body);

        const doesExist = await User.findOne({email : result.email});
        if(doesExist) throw createError.Conflict(`${result.email} is already registered !`)

        const user = new User(result);
        const savedUser = await user.save();
        
    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
}

export const login = async (req, res, next)=>{
    try {
        const result = await loginSchema.validateAsync(req.body);

        const user = await User.findOne({email: result.email});
        if(!user) throw createError.NotFound('User not registered!');

        const isMatch = await user.isValidPassword(resut.password);
        if(!isMatch) throw createError.Unauthorized('Username/Password not valid!');

        

    } catch (error) {
        console.log(error.message);
    }
}

export const logout = (req, res, next)=>{
    res.send();
}