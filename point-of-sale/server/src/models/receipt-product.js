const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptProductSchema = new Schema({
    receipts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' } ],
    products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],
});

module.exports = mongoose.model('ReceiptProduct', receiptProductSchema);