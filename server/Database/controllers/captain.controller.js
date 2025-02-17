import captainModel from "../models/captain.model.js";
import captainService from "../../services/captain.service.js";
import { validationResult } from "express-validator";
import BlacklistTokenModel from "../models/blacklistToken.model.js";

const registerCaptain = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const { fullname: { firstname, lastname }, email, password, vehicle: { color, plate, capacity, vehicleType }} = req.body;
    const isCaptainAlreadyRegistered = await captainModel.findOne({ email });
    if(isCaptainAlreadyRegistered){
        return res.status(400).json({ message : "Captain already exists"});
    }
    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname,
        lastname,
        email,
        password: hashPassword,
        color,
        plate,
        capacity,
        vehicleType
    })
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}

const loginCaptain = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const { email, password} = req.body;
    const captain = await captainModel.findOne({ email}).select('+password');
    if(!captain){
        return res.status(401).json({ message : "Invalid email or password"});
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message : "Invalid email or password"});
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain});
}

const getCaptainProfile = async(req,res) => {
    res.status(200).json({ captain : req.captain});
}

const logoutCaptain = async(req,res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistTokenModel.create({ token });
    res.status(200).json({ message : "Logged Out Successfully"});
}

const captainController = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
}

export default captainController;