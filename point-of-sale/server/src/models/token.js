const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: { type: String, required: true, unique: true },
    valid: { type: Boolean, required: true }
});

module.exports = mongoose.model('Token', tokenSchema);