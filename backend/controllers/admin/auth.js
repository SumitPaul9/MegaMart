import createError from 'http-errors';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../helpers/jwt_helper.js';
import { loginSchema,signupSchema } from '../../helpers/validation_schema.js'
import { User } from '../../models/user.js'

export const signup = async(req, res, next) =>{
    try {
        const result = await signupSchema.validateAsync(req.body);

        const doesExist = await User.findOne({email: result.email});
        if(doesExist) throw createError.Conflict(`${result.email} is already registered!`);

        result["role"] = "admin";
        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser);
        const refreshToken = await signRefreshToken(savedUser);
        res.send({accessToken, refreshToken});
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
}

export const login = async(req, res, next) => {

    try {
    
        const result = await loginSchema.validateAsync(req.body);

        const user = await User.findOne({ email: result.email});
        if(!user) throw createError.NotFound('User not registered!');

        const isMatch = await user.isValidPassword(result.password);
        if(!isMatch) throw createError.Unauthorized('Username/Password not valid!');

        if(user.role != "admin") throw createError.Unauthorized('Unable to login. Please contact administrator!')
        const accessToken = await signAccessToken({id:user.id, role: user.role});
        const refreshToken = await signRefreshToken({id:user.id, role: user.role});

        res.send({accessToken, refreshToken});
        
    } catch (error) {
            if(error.isJoi === true) error.status = 422;
            next(error);
    }

}

// export const logout = async(req, res, next) => {
//     try {
//         const { refreshToken } = req.body;

//         if(!refreshToken) throw createError.BadRequest();
//         const userId = await verifyRefreshToken(refreshToken);
//     } catch (error) {
//         next(error);
//     }
// }

// export const refreshToken = () =>{
    
// }