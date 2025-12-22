const express = require("express");
const router = express.Router();

// Dummy Payment API
router.post("/pay", async (req, res) => {
  const { amount, cartItems, userId } = req.body;

  // Simulate delay (like real payment)
  setTimeout(() => {
    res.json({
      success: true,
      message: "Payment Successful (Dummy)",
      transactionId: "TXN_" + Date.now(),
      amount
    });
  }, 1500);
});

module.exports = router;
