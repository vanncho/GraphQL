const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    products: { type: mongoose.Schema.Types.String, required: true },
    active: { type: mongoose.Schema.Types.Boolean, default: true, required: true },
    productCount: { type: mongoose.Schema.Types.Number, required: true },
    total: { type: mongoose.Schema.Types.Number, required: true },
    creationDate: { type: mongoose.Schema.Types.String, default: dateFormatToString() },
    user: { type: mongoose.Schema.Types.String, required: true }
});

function dateFormatToString() {

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    let minutes = now.getMinutes();

    if (minutes.toString().length === 1) {
        minutes = '0' + minutes;
    }

    return `${year}-${month}-${day} ${hour}:${minutes}`;
};

module.exports = mongoose.model('Receipt', receiptSchema);