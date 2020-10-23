const mongoose = require('mongoose');

let blockSchema = new mongoose.Schema({
    tx_id: String,
    tx_type: String,
    sender_id: String,
    receiver_id: String,
    amount: String,
    payment: String,
    paymented: String,
    timestamp: String,
    update_at: {type: Date, default: Date.now},
})
module.exports = mongoose.model('block', blockSchema);