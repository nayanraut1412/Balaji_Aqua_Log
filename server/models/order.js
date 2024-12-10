const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  cansTaken: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Pending'], required: true },
  orderDate: { type: Date, required: true },
  duration: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
