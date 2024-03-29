const stripe = require('stripe')('sk_test_51HEcJMCGYSCXYTt7gBtje0FpTvieHRmhSilNPZxcsEjdTBAGk5BpUyF0n5VTthVNMH1TYjsstfPHuntIhT3TmsCm00xw1Pfepz');
const stripe_public_key = 'pk_test_51HEcJMCGYSCXYTt7yhvtLzoflTkP9ylF9HUjOR1NwGrsRcvd0ocC5bmk473p0wWfvMHhbeKUJKShjsqXDF2yHhTL000CshWuRn';

const templateLib = require('./template');

module.exports.render_checkout = function(request, response){

    var full_url = request.protocol + "://" + request.get('host');

    var product_name = request.body.product_name?request.body.product_name:"Some Product Name";
    var order_id = request.body.order_id;
    var amount = request.body.amount;
    var currency = request.body.currency;
    var quantity = request.body.quantity?request.body.quantity:1;

    let session_data = {
        success_url: full_url + '/process_stripe_payment?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: full_url + '/cancel',
        payment_method_types: ['card'],
        line_items: [
          {
            name: product_name,
            amount: amount * 100,
            currency: currency,
            quantity: quantity
          },
        ],
        metadata:{
            order_id: order_id
        }
    }
    stripe.checkout.sessions.create(
        session_data,
        (err, session) => {
            if (err) {
                response.send({ "error": err });
            } else if (session) {
                response.send(
                    templateLib.getTemplate(stripe_public_key,session.id)
                );
            } else {
                response.send({ "error": "Some other problem" })
            }
        }
    );
};

module.exports.process_checkout = function(request, response){
    var session_id = request.query.session_id;
    stripe.checkout.sessions.retrieve(
        session_id,
        (err, session) => {
            if (err) {
                response.redirect('/cancel');
            } else if (session) {
                response.redirect(`/success?order_id=${session.metadata.order_id}&amount=${parseFloat(session.display_items[0].amount/100)}&transaction_id=${session.payment_intent}`)
            } else {
                response.redirect('/cancel');
            }
        }
    );
};
