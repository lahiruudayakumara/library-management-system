import { Request, Response } from "express";

import Payment from "../models/paymentModel";
import User from "../models/userModel";

// Create a payment intent with Stripe
export const createPayment = async (req: Request, res: Response) => {
  const { amount, userId, membershipType } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      metadata: { membershipType, userId },
    });

    const payment = new Payment({
      userId,
      membershipType,
      amount,
      paymentStatus: "Pending",
      paymentProcessorTransactionId: paymentIntent.id,
    });

    await payment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating payment intent");
  }
};

// Endpoint for Stripe webhook to handle payment success/failure
export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const payment = await Payment.findOne({
        paymentProcessorTransactionId: paymentIntent.id,
      });

      if (payment) {
        payment.paymentStatus = "Succeeded";
        await payment.save();
      }
    }

    res.status(200).send("Webhook handled");
  } catch (error) {
    console.error(error);
    res.status(400).send("Webhook error");
  }
};
