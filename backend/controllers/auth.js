import {
    loginSchema,
    signupSchema
} from '../helpers/validation_schema.js'
import {
    User
} from '../models/user.js';
import createError from 'http-errors';
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
} from '../helpers/jwt_helper.js'
export const signup = async (req, res, next) => {

    try {
        const result = await signupSchema.validateAsync(req.body);

        const doesExist = await User.findOne({
            email: result.email
        });
        if (doesExist) throw createError.Conflict(`${result.email} is already registered !`)

        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);
        res.send({accessToken, refreshToken});

    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const result = await loginSchema.validateAsync(req.body);

        const user = await User.findOne({
            email: result.email
        });
        if (!user) throw createError.NotFound('User not registered!');

        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized('Username/Password not valid!');

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.send({accessToken, refreshToken});


    } catch (error) {
        if(error.isJoi === true){
            return next(createError.BadRequest('Invalid Username/Password'))
        }
        next(error);
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);
        res.send({
            accessToken: accessToken,
            refreshToken: refToken
        });
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        const {
            refreshToken
        } = req.body;
        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);
    } catch (error) {
        next(error);
    }
}