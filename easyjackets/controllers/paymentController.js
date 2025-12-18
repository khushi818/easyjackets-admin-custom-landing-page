import Order from '../models/orderModel.js'
import {stripe} from '../config/stripe.js'
import design from '../models/design.js';
import orderModel from '../models/orderModel.js';
import { sendEmail } from '../helpers/email.js';

export const create_payment_session = async (req, res) => {
    const { products } = req.body;
    const customer = await stripe.customers.create({
      metadata :{
        userId : req.user._id,
        designId : JSON.stringify(products.map((product) => product.designId))
      }
    })
    const lineItems = products.map(product => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount : Math.round(100),
        // unit_amount: Math.round(product.price * 100), // price in cents
      },
      quantity: product.quantity,
    }));
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [...lineItems],
        customer : customer.id,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });

      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const create_guest_payment_session = async (req, res) => {
  const { products } = req.body;
  const customer = await stripe.customers.create({
    metadata :{
      cart : JSON.stringify(products)
    }
  })

  
  const lineItems = products.map((product, index) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name ,
        images : [product?.frontImage]
      },
      // unit_amount : Math.round(50),
     
      unit_amount: Math.round((Number(product.price)) * 100), // price in cents
    },
    quantity: product.quantity,
  }));

  const quantity = products.reduce((acc, item) => acc + item.quantity, 0);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'IN'],  // Specify allowed shipping countries
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount : quantity * 30 *100,
              currency: 'usd',
            },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 4 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      phone_number_collection : {
        enabled : true
      },
      line_items: [...lineItems],
      billing_address_collection: 'required',
      customer : customer.id,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const retrieve_session = async(req,res) =>{
    const { sessionId } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const order = await orderModel.findOne({ transactionId : session.id }).populate( 
        {
           path : 'cartData.id',
           model : 'Products'
        }). populate(   {
              path :'cartData.designId',
              model : 'design',
              select :{
                  _id : 1,
                  custom_image :  1, 
                  custom_price : 1 ,
                  globals : 1,
                  sizes : 1
              }
            }
          )
      
      res.json({session , order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const triggerWebhook = async (req, res) =>{
  const sig = req.headers['stripe-signature'];
  let event;
  let data;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, `${process.env.STRIPE_WEBHOOK_LIVE_SECRET}`);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customer_data = await stripe.customers.retrieve(session.customer)
    const cartData = JSON.parse(customer_data.metadata.cart)

    // Here you can create an order in your database using the session details
    const randomId = Math.random().toString(36).substr(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-5); // Last 5 digits of the timestamp

    const order = {
      transactionId : session.id,
      orderId: randomId + timestamp,
      totalAmount: session.amount_total,
      totalItems : cartData.length,
      currency: session.currency,
      cartData ,
      status : 'pending',
      shipping_details : session.shipping_details,
      billing_Details : session.customer_details
      // Include other order details as needed
    };

    const orders = await Order.create(order)
    // await sendEmail(orders.billing_Details[0].name,orders.billing_Details[0].email, orders , '/views/orderInvoice.ejs')
    // console.log('Order created:', order);
    // Save the order to your database here
  }

  res.json({ received: true });
}


