import mapService from "../../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const address = req.query.address;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch(error) {
        res.status(404).json({message : 'Coordinates not found'});
    }
}

const getDistanceTime = async(req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin,destination);
        res.status(200).json(distanceTime);
    } catch(error) {
        res.status(404).json({message : 'Coordinates not found'});
    }
}

const getAutoCompleteSuggestions = async(req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch(error) {
        res.status(500).json({ message : 'Internal server error'});
    }
}

const mapsController = {
    getCoordinates,
    getDistanceTime,
    getAutoCompleteSuggestions
}

export default mapsController;