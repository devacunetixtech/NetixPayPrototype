const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderName: String,
  senderUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientName: String,
  recipientUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  narration: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
