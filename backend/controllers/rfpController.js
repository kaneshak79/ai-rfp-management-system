const nodemailer = require("nodemailer");
const RFP = require("../models/RFP");

// Create RFP
exports.createRFP = async (req, res) => {
  try {
    const rfp = new RFP(req.body);
    await rfp.save();
    res.status(201).json(rfp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all RFPs
exports.getAllRFPs = async (req, res) => {
  try {
    const rfps = await RFP.find();
    res.json(rfps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get RFP by ID
exports.getRFPById = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id);
    res.json(rfp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send Email
exports.sendEmail = async (req, res) => {
  try {
    const { toEmail, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: toEmail,
      subject,
      text: message,
    });

    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//generate rfp using ai
// Generate RFP Using AI
exports.generateRFP = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    // Simple mock AI generation
    const generated = {
      title: "Generated RFP",
      description,
      budget: 50000,
      items: [
        { name: "Example Item 1", quantity: 10, specs: "Sample Specs" },
      ],
    };

    res.json(generated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
