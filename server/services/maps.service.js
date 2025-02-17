import axios from "axios";
import env from "dotenv";
import captainModel from "../Database/models/captain.model.js";
env.config();

const getAddressCoordinate = async(address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                latitude : location.lat,
                longitude : location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}

const getDistanceTime = async(origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and times');
        }
    } catch(error) {
        throw error;
    }
}

const getAutoCompleteSuggestions = async(input) => {
    if(!input){
        throw new Error('Query is required');
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch(error) {
        throw new error;
    }
}

const getCaptainInTheRadius = async(ltd, lng, radius) => {

}

const mapService = {
    getAddressCoordinate,
    getDistanceTime,
    getAutoCompleteSuggestions
}

export default mapService;