import { NextFunction } from 'express';
import Reservation from '../models/reservationModel';
import logger from '../utils/logger';

// Reserve a book
export const reserveBook = async (req: Request | any, res: Response | any, next: NextFunction) => {
  const { bookId } = req.body;
  try {
    const reservation = new Reservation({ bookId, userId: req.user.id });
    await reservation.save();

    logger.info(`Book Id ${bookId} reserved by User id ${req.user.id}`);
    res.status(201).json({ success: true, message: "Book reserved successfully", data: reservation });
  } catch (error: any) {
    logger.info(error.message);
    next(error);
  }
};

// Cancel a reservation
export const cancelReservation = async (req: Request | any, res: Response | any, next: NextFunction) => {
  const { reservationId } = req.params;
  try {
    const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: "Cancelled" }, { new: true });
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }
    logger.info(`Id: ${reservationId} Reservation Cancelled`);
    res.status(200).json({ success: true, message: "Reservation cancelled successfully" });
  } catch (error) {
    next(error);
  }
};
