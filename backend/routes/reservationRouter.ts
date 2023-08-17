import { cancelReservation, reserveBook } from '../controllers/reservationController';

import express from 'express';
import verifyRole from '../middlewares/roleBasedAccess';

const router = express.Router();


// Route to reserve a book
router.post('/reserve', reserveBook);

// Route to cancel a reservation
router.put('/cancel/:reservationId', cancelReservation);

module.exports = router;
