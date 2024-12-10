const Order = require('../models/order');
require('dotenv').config()
const axios = require('axios')

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    await newOrder.save();

    const messageBody = `
    📃 *Receipt Details*:
    Name: ${orderData.name}
    Phone: ${orderData.phoneNumber}
    Address: ${orderData.address}
    Cans Taken: ${orderData.cansTaken}
    Payment Status: ${orderData.paymentStatus === 'Paid' ? '✅ Paid' : '❌ Pending'}
    Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}
    Duration: ${orderData.duration}
        `;

    const response = await axios({
      url: 'https://graph.facebook.com/v21.0/498717726658120/messages',
      method: 'post',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '919665926311',
        type: 'template',
        template: {
          name: 'orders',
          language: {
            code: 'en'
          },
          components: [
            {
              type: 'header',
              parameters: [
                {
                  type: 'text',
                  text: orderData.name,
                }
              ]
            },
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: orderData.name,
                },
                {
                  type: 'text',
                  text: orderData.cansTaken
                },
                {
                  type: 'text',
                  text: orderData.phoneNumber
                },
                {
                  type: 'text',
                  text: orderData.duration
                },
                {
                  type: 'text',
                  text: orderData.orderDate
                },
                {
                  type: 'text',
                  text: orderData.paymentStatus === 'Paid' ? '✅ Paid' : '❌ Pending'
                },
                {
                  type: 'text',
                  text: orderData.address
                }

              ]
            }
          ]
        }
      })
    })
    console.log(response.data)

    res.status(201).json({ success: true, message: 'Order created and WhatsApp message sent successfully!', order: newOrder });
  } catch (error) {
    console.error('Error creating order or sending WhatsApp message:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Error creating order or sending WhatsApp message', error: error.message });
  }
};



// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Retrieve all orders from the database
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message });
  }
};
