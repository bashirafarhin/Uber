import userModel from "../models/user.model.js"
import userService from "../../services/user.service.js"
import { validationResult } from "express-validator"
import BlacklistToken from "../models/blacklistToken.model.js";

const registerUser = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const { fullname: { firstname, lastname }, email, password } = req.body;
    const isUserAlreadyRegistered = await userModel.findOne({ email });
    if(isUserAlreadyRegistered){
        return res.status(400).json({ message : "User already exists"});
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashPassword
    })
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

const loginUser = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const { email, password} = req.body;
    const user = await userModel.findOne({ email}).select('+password'); //here +password is used to select the password as we have set select : false in the model
    if(!user){
        return res.status(401).json({ message : "Invalid email or password"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message : "Invalid email or password"});
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user});
}

const getUserProfile = async(req,res) => {
    res.status(200).json(req.user);
}

const logoutUser = async(req,res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({ token });
    res.status(200).json({ message : "Logged Out Successfully"});
}

const userController = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
}

export default userController;