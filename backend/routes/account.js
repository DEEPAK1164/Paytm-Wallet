const express = require("express");
const { authMiddleware, transferBody } = require("../middleware/index");
const { Account } = require("../models");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.json({ balance: account.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const { success } = transferBody.safeParse(req.body);
      if (!success) {
        throw new Error("Invalid Inputs");
      }

      const { to, amount } = req.body;

      const fromAccount = await Account.findOne({ userId: req.userId }).session(session);

      if (!fromAccount || fromAccount.balance < amount) {
        throw new Error("Insufficient Balance");
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
        throw new Error("Invalid Account");
      }

      // Update the balances
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    });

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.error("Error during transfer:", error);

    // Ensure to abort the transaction in case of an error
    await session.abortTransaction();

    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the session
    session.endSession();
  }
});

module.exports = router;
module.exports = router;
