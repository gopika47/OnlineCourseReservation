
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Payment = require("./models/Payment");

const app = express();

app.use(cors());
app.use(express.json());

const courseFees = {
  Java: 5000,
  Python: 4000,
  "Web Development": 6000
};

app.get("/", (req, res) => {
  res.send("Online Course Reservation Backend is running!");
});

// Get all payment records
app.get("/api/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to load payments" });
  }
});

// Create a payment record
app.post("/api/payments", async (req, res) => {
  try {
    const { studentName, courseName, paymentMethod } = req.body;

    if (
      typeof studentName !== "string" ||
      !studentName.trim() ||
      !Object.prototype.hasOwnProperty.call(courseFees, courseName) ||
      !["UPI", "Card", "Net Banking"].includes(paymentMethod)
    ) {
      return res.status(400).json({
        message: "Please enter valid payment details"
      });
    }

    const payment = new Payment({
      studentName: studentName.trim(),
      courseName,
      amount: courseFees[courseName],
      paymentMethod,
      paymentStatus: "Pending",
      receiptNumber: "REC" + Date.now()
    });

    const savedPayment = await payment.save();

    res.status(201).json({
      message: "Payment record saved successfully!",
      payment: savedPayment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save payment" });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB error:", error.message));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
