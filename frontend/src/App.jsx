
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/payments";

function App() {
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("Java");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const fees = {
    Java: 5000,
    Python: 4000,
    "Web Development": 6000
  };

  async function loadPayments() {
    try {
      const response = await axios.get(API);
      setPayments(response.data);
    } catch {
      setMessage("Unable to load payment history. Check the backend.");
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setReceipt(null);

    try {
      const response = await axios.post(API, {
        studentName,
        courseName,
        paymentMethod
      });

      setReceipt(response.data.payment);
      setMessage(response.data.message);
      setStudentName("");
      await loadPayments();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Connection failed. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="payment-card">
        <h1>Course Fee Payment</h1>
        <p className="subtitle">Online Course Reservation System</p>

        <form onSubmit={handleSubmit}>
          <label>Student Name</label>
          <input
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />

          <label>Select Course</label>
          <select
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          >
            <option value="Java">Java - ₹5,000</option>
            <option value="Python">Python - ₹4,000</option>
            <option value="Web Development">
              Web Development - ₹6,000
            </option>
          </select>

          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>

          <div className="fee">
            Total Fee: ₹{fees[courseName].toLocaleString("en-IN")}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Payment Record"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        {receipt && (
          <div className="receipt">
            <h2>Payment Receipt</h2>
            <p>Receipt No: {receipt.receiptNumber}</p>
            <p>Student: {receipt.studentName}</p>
            <p>Course: {receipt.courseName}</p>
            <p>Amount: ₹{receipt.amount.toLocaleString("en-IN")}</p>
            <p>Method: {receipt.paymentMethod}</p>
            <p>Status: {receipt.paymentStatus}</p>
            <button type="button" onClick={() => window.print()}>
              Print Receipt
            </button>
          </div>
        )}
      </section>

      <section className="history">
        <h2>Payment History</h2>
        {payments.length === 0 ? (
          <p>No payment records found.</p>
        ) : (
          payments.map((payment) => (
            <article className="history-item" key={payment._id}>
              <p><strong>Receipt:</strong> {payment.receiptNumber}</p>
              <p><strong>Student:</strong> {payment.studentName}</p>
              <p><strong>Course:</strong> {payment.courseName}</p>
              <p>
                <strong>Amount:</strong>{" "}
                ₹{payment.amount.toLocaleString("en-IN")}
              </p>
              <p><strong>Method:</strong> {payment.paymentMethod}</p>
              <p><strong>Status:</strong> {payment.paymentStatus}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default App;
