const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReceiptSchema = new Schema({
    users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    receipts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' } ]
});

module.exports = mongoose.model('UserReceipt', userReceiptSchema);