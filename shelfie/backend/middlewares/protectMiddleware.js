import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';


// const secret = `${process.env.JWT_SECRET}`;


export const protect = (async (req, res, next) => {
    try {

        //getting token and check if it exist
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        //verification token
        if (!token) {
            throw new Error('You are not logged in! Please log in to get access.');
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        //check if user is logged in
        const freshuser = await User.findById(decoded.id);
        if (!freshuser) {
            throw new Error('This user no longer exists');
        }

        //check if user changed psw after the toke was issued
        if (freshuser.changedPasswordAfter(decoded.iat)) {
            throw new Error('User recently changed password! Please log in again.');
        }

        req.user = freshuser;

        //grant access to the next protected route
        next()

    } catch (err) {
        next(err)
    }

})
