import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';
import { sendEmail } from '../utils/email.js';


// const secret = `${process.env.JWT_SECRET}`;
const signToken = id => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION });
};


const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    //add cookie to the response for sending the token
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,

    }
    //activate the https in production mode
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }

    res.cookie("jwt", token, cookieOptions)
    //remove password
    user.password = undefined;

    console.log(`Cookie set: ${JSON.stringify(cookieOptions)}`);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    })

}


export const signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            fname: req.body.fname,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            profilePic: req.body.profilePic,
        })

        const token = signToken(newUser._id);

        createSendToken(newUser, 201, res);

        // res.status(201).json({
        //     status: 'success',
        //     token,
        //     data: {
        //         user: newUser
        //     }
        // })

    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        //check if email and psw exist
        if (!email || !password) {
            throw new Error('Please provide email and password');
        }

        //check if user exists and if password is correct
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Incorrect email or password');
        }

        //if everything is correct send token to the client
        const token = signToken(user._id);

        createSendToken(user, 200, res);

        // res.status(200).json({
        //     status: 'success',
        //     token
        // })

    } catch (err) {
        next(err);
    }
}


export const forgotPassword = async (req, res, next) => {
    try {

        // Get user based on email

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            throw new Error('There is no user with that email address');
        }

        //generate random token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });



        //send it back as an email
        const resetURL = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`;
        const message = `Forgot your password? Click here: ${resetURL} to reset your password.\nIf you didn't forget your password, please ignore this email!`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Reset your password(only valid for 10 min)',
                message
            })
            createSendToken(user, 200, res);

            res.status(200).json({
                status: 'success',
                message: 'Token sent to email!'
            })

        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(err);
        }


    } catch (err) {
        next(err);
    }
}

export const resetPassword = async (req, res, next) => {

    try {
        //get user based on the token
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

        //if token has not expired and there is a user, set a new password
        if (!user) {
            throw new Error('Token is invalid or has expired');
        }

        if (!user) {
            throw new Error('Token is invalid or has expired');
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();


        //update changedPasswordAt property for the user


        //log the user in, send JWT
        createSendToken(user, 200, res);

        // const token = signToken(user._id);

        // res.status(200).json({
        //     status: 'success',
        //     token
        // })

    } catch (err) {
        next(err)
    }
}

export const updatePassword = async (req, res, next) => {


    try {
        //get user from the collection
        // const userId = req.params.id
        const user = await User.findById(req.user.id).select('+password');

        const password = req.body.oldPassword;

        //check if password is correct
        if (!(await user.correctPassword(password, user.password))) {
            throw new Error('Incorrect password');
        }

        //update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        //log user in with the new password

        createSendToken(user, 200, res);

        // const token = signToken(user._id);

        // res.status(200).json({
        //     status: 'success',
        //     token
        // })

    } catch (err) {
        next(err)
    }
}