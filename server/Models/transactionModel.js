const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  tranType: String,
  senderName: String,
  senderUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderAcctNo: {type: String, minlength: 3, maxlength: 1024},
  recipientName: String,
  recipientUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientAcctNo: {type: String, minlength: 3, maxlength: 1024},
  amount: Number,
  narration: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
