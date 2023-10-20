const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  narration: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
