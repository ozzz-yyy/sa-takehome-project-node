/*  Some of the code snippet used on this file is taken from the payment intent 
    tutorial https://stripe.com/docs/payments/payment-intents
*/

// To Do: process doesn't work on client side so need to look into browsify so that it the key 
// can be taken from process or env variables
var stripe = Stripe('INSERT KEY HERE');
// const path = require('path');
// require('dotenv').config({ path: '.env' });
// var stripe = Stripe(process.env.STRIPE_PUBLISH_KEY);

var elements = stripe.elements();

var style = {
    base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: '#32325d',
    },
};

// Create an instance of the card Element.
var card = elements.create('card', { style: style });

// read some item attributes from the html
var title = document.getElementById('item_title').innerHTML.trim();
var amount = document.getElementById('pay_amount_btn').getAttribute('data_amount');

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// this will create token and create a charge 
var form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    stripe.createToken(card)
        .then(function (result) {
            // could switch to try catch so that we have one place to catch all errors???
            if (result.error) {
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                stripeTokenHandler(result.token);
                return result;
            }

        }).then(function (result) {
            // error handling in case of invalid CC
            // don't need to create a charge in this case
            if (result == null) {
                return;
            } else {

                // add more info in result related to items
                var token = result.token;
                var params = {token, title, amount};
                fetch("/charge", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(params)
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {

                    // To Do: error handling in case of errors
                    
                    // in case of several query string params need a different approach
                    // so that this information is not in the query string visible to users
                    window.location.href = 'http://localhost:3000/success?charge_id='
                        + data.charge_id + '&amount=' + amount;
                });
            } // end else
        });
});

// using hidden attribute field for stripe token
function stripeTokenHandler(token) {
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
}