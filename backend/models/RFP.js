const mongoose = require("mongoose");

const RFPSchema = new mongoose.Schema({
  title: String,
  description: String,
  structuredData: Object,
  vendorsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
  proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proposal" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RFP", RFPSchema);
