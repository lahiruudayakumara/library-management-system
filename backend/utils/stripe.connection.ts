const { config } = require("dotenv");

const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res, next) => {
  const { penaltyId, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Library Penalty" },
            unit_amount: amount * 100, // Stripe accepts amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${require("../config/config").CLIENT_URL}/payment-success?penaltyId=${penaltyId}`,
      cancel_url: `${require("../config/config").CLIENT_URL}/payment-cancel`,
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    next(error);
  }
};