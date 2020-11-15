const mongoose = require("mongoose");
const txSchema = new mongoose.Schema({
  block_height: String,
  tx_id: String,
  tx_type: String,
  sender_id: String,
  receiver_id: String,
  value: Number,
  act_data: String,
  act_content: String,
  timestamp: String,
});
module.exports = mongoose.model("transaction", txSchema);
