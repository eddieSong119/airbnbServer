const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecretKey = process.env.WEBHOOK_ENDPOINT_SECRET;

// Middleware to create the Stripe event before handling.
const verifySignature = (req, res, next) => {
  console.log("signature varifying");
  const signature = req.headers["stripe-signature"];
  try {
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      endpointSecretKey
    );
    req.body = event.data.object;
    req.eventType = event.type;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { verifySignature };
