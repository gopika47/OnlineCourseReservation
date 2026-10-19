
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },

  courseName: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    required: true
  },

  paymentStatus: {
    type: String,
    default: "Pending"
  },

  receiptNumber: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Payment", paymentSchema);
