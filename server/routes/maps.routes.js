import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { query } from "express-validator";
import mapsController from "../Database/controllers/maps.controller.js";

const router = express.Router();

router.get('/get-coordinates',
    query('address').isString().isLength({ min : 3 }),
    authMiddleware.authUser,
    mapsController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min : 3}),
    query('destination').isString().isLength({min : 3}),
    authMiddleware.authUser,
    mapsController.getDistanceTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({ min : 3}),
    authMiddleware.authUser,
    mapsController.getAutoCompleteSuggestions
)

export default router;