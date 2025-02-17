import rideService from "../../services/ride.services.js";
import { validationResult } from "express-validator";

const createRide = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const { userId, pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({user : req.user._id, pickup, destination, vehicleType});
        res.status(201).json(ride);
    } catch(error) {
        res.status(500).json({ message : error.message });
    }
}

const getFare = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const { pickup, destination } = req.body;
    try {
        const fare = await rideService.getFare({ pickup, destination });
        res.status(200).json(fare);
    } catch(error) {
        res.status(500).json({ message : error.message });
    }

}
const rideController = {
    createRide,
    getFare
}

export default rideController