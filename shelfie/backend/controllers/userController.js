import User from '../models/usersModel.js';
import mongoose from 'mongoose';

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    })
    return newObj;
}

export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password || req.body.passwordConfirm) {
            throw new Error('To change user password please follow the dedicated link')
        }
        //filter out unwanted fields name that we don't want to be updated
        const filteredBody = filterObj(req.body, 'fname', 'email', 'profilePic');
        //update the user
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: updatedUser
        })
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { active: false });
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        next(err)
    }
}