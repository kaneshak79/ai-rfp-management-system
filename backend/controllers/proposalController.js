const Proposal = require("../models/Proposal");
const { sendEmail } = require("../utils/emailService");

exports.submitProposal = async (req, res) => {
  try {
    const { rfpId, vendorId, proposalText, price } = req.body;

    const proposal = new Proposal({
      rfp: rfpId,
      vendor: vendorId,
      proposalText,
      price,
      structuredData: {},
    });

    await proposal.save();

    // ---------------------
    // 📩 Email Notification
    // ---------------------
    sendEmail(
      "admin@example.com",
      "New Proposal Submitted",
      `A vendor submitted a proposal.\n\nPrice: ${price}\nText: ${proposalText}`
    );
    // ---------------------

    res.status(201).json(proposal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all proposals
exports.getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate("rfp", "title description")
      .populate("vendor", "name email");
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get proposals for specific RFP
// GET proposals for a specific RFP
exports.getProposalsByRfp = async (req, res) => {
  try {
    const proposals = await Proposal.find({ rfp: req.params.rfpId })
      .populate("vendor", "name email")   // Get vendor name
      .populate("rfp", "title");          // Get RFP title

    res.json(proposals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


