const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  rfp: { type: mongoose.Schema.Types.ObjectId, ref: "RFP", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  proposalText: { type: String, required: true },
  price: { type: Number },
  structuredData: { type: Object, default: {} },
}, { timestamps: true });



module.exports = mongoose.model("Proposal", ProposalSchema);
