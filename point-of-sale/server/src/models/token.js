const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: { type: mongoose.Schema.Types.String, required: true, unique: true },
    valid: { type: mongoose.Schema.Types.Boolean, required: true }
});

module.exports = mongoose.model('Token', tokenSchema);