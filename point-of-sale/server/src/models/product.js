const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    quantity: { type: mongoose.Schema.Types.Number, required: true },
    price: { type: mongoose.Schema.Types.Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);