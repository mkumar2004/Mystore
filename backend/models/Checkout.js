const mongoose = require('mongoose');

// Subdocument for each cart item
const checkoutItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { _id: false });

// Main checkout schema
const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  checkout: {
    type: [checkoutItemSchema],
    required: true,
  },
  ShippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Racerpay',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  paymentStatus: {
    type: String,
    default: 'pending',
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  isFinalised: {
    type: Boolean,
    default: false,
  },
  FinalisedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

checkoutSchema.index({ user: 1, isPaid: 1, isFinalised: 1 }, { unique: true });
module.exports = mongoose.model('Checkout', checkoutSchema);

