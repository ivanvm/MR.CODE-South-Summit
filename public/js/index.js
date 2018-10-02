window.jQuery = window.$ = require('./../../node_modules/jquery');
require('../../node_modules/bootstrap')
require('../scss/custom.scss')

document.addEventListener('DOMContentLoaded', function (ev) {
  window.onpopstate = function (ev) {
    window.location.reload(true)
  }
  var stripe = Stripe('pk_live_xi7g8sZDZAxUQ73frozye1Ie');
  var elements = stripe.elements();
  var card = elements.create('cardNumber');
  var exp = elements.create('cardExpiry');
  var cvc = elements.create('cardCvc');
  card.mount('#numero-tarjeta');
  exp.mount('#caducidad-tarjeta');
  cvc.mount('#cvv');
})
