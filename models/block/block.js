const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  block_height: String,
  block_hash: String,
  tx_count: String,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("block", blockSchema);
