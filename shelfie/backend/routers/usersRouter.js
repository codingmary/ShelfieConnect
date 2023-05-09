import express from 'express';

import { forgotPassword, login, resetPassword, signup, updatePassword } from '../controllers/authControllers.js';
import { protect } from '../middlewares/protectMiddleware.js';
import { deleteUser, updateUser } from '../controllers/userController.js';


const router = express.Router();

//route for registration
router.route('/signup').post(signup);

//route for login
router.route('/login').post(login);

//forgot and reset password
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

//update password
router.route('/updateMyPassword').patch(protect, updatePassword);


//route for updating user info(no password)
router.route('/updateInfo').patch(protect, updateUser)

router.route('/deleteMe').delete(protect, deleteUser)


export default router