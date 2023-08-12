import { NextFunction } from "express";
import Penalty from "../models/penaltyModel";
import logger from "../utils/logger";

// Add Penalty
export const addPenalty = async (req: Request | any, res: Response | any, next: NextFunction) => {
  const { transactionId, userId, penaltyAmount } = req.body;

  try {
    const penalty = new Penalty({ transactionId, userId, penaltyAmount });
    await penalty.save();

    res.status(201).json({ success: true, message: "Penalty added", data: penalty });
    logger.info(`Penalty added for transaction: ${transactionId}`);
  } catch (error: any) {
    logger.error(`Error adding penalty: ${error.message}`);
    next(error);
  }
};


// Get All Penalties
export const getPenalties = async (req: Request | any, res: Response | any, next: NextFunction) => {
  try {
    const penalties = await Penalty.find().populate("transactionId", "issuedDate returnDate");

    res.status(200).json({ success: true, data: penalties });
    logger.info("Get All Panalties");
  } catch (error: any) {
    logger.error(`Error fetching penalties: ${error.message}`);
    next(error);
  }
};
