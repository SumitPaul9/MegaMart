// import createError from "http-errors";
// import { User } from '../models/user.js'

// export const verifyAdminAccess = async (req, res, next)=>{
//     try {
//         const user = await User.findOne({ email: req.body.email});
//         console.log(user)
//         if(user.role !== "admin") throw createError.NotFound('Access Denied!');
//     } catch (error) {
//         next(error);
//     }
// }