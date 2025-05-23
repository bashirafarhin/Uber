import express from "express";
import { body, query } from "express-validator";
import rideController from "../Database/controllers/ride.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min : 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min : 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min : 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min : 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)
export default router;