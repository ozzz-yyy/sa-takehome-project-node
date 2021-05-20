// This is sort of a controller which makes a request to stripe to create charge 
// and returns a "charge" object, possible enhancment of this would be to return the complete
// charge object in case other response objects are needed
const express = require('express');
var router = express.Router();
require('dotenv').config({ path: '.env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.post("/charge", async (req, res) => {
    var token_id = req.body.token.id;
    var amount = req.body.amount;
    var title = req.body.title;
    // Create Stripe Charge, we need the stripe token and amount,
    // along with other details of the item
    stripe.charges.create({
        amount: amount * 100,
        currency: 'USD', // for now assuming that the charge will be in USD
        description: title,
        source: token_id
    }).then(function (result) {
        // To Do: error handling in case of declined cards etc.

        // for now assuming that we only need the ID
        // we can create a charge model and use the response to initalize the object
        res.send({
            charge_id: result.id
        });
    });
  });


module.exports = router;
