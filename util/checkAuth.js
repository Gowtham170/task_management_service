import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createError from './createError.js';
import userModel from '../model/user.js';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 


export default async(req, res, next) => {
    const token = req.cookies.auth_token;
    if(!token) {
        return next(createError({status: 401, message: 'Access Denied: Not authorized to access this route'}));
    }
    try {
        const verifyToken = jwt.verify(token, JWT_SECRET_KEY);
        const user = await userModel.findById(verifyToken._id);
        if(!user) {
            return next(createError({status: 404, message: 'No user found'}));
        }
        req.user = user;
        next();
    }  catch (err) {
        return next(createError({status: 400, message: 'Invalid Token'}));
    }
}
