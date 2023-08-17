import { createPayment, stripeWebhook } from '../controllers/paymentControllers';

import express from 'express';
import verifyRole from '../middlewares/roleBasedAccess';

const router = express.Router();

router.post('/create-payment-intent', createPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;