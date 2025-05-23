import express from "express";
import { body } from "express-validator";
import userController from "../Database/controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({ min: 3 }).withMessage('Password must be of at least 6 characters long')
], userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be of at least 6 characters long')
], userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);

export default router;