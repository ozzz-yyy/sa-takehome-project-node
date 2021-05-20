const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
require('dotenv').config({ path: '.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var app = express();
app.use(express.json());

var chargeRouter = require('./router/chargeRouter');

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800  
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }

  res.render('checkout', {
    title: title,
    amount: amount,
    error: error
  });
});

/**
 * Success route
 */
app.get('/success', function(req, res) {
  res.render('success', {
    charge: req.query.charge_id,
    amount: req.query.amount
  });
});


app.post('/charge', chargeRouter);
/**
 * Start server 
 */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Getting served on port ' + PORT);
});
