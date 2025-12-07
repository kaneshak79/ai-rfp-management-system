const express = require("express");
const router = express.Router();
const { sendEmail } = require("../utils/emailService");

router.post("/send-rfp", async (req, res) => {
  try {
    const { vendorEmail, rfpTitle, rfpDescription, budget } = req.body;

    const htmlContent = `
      <h2>New RFP Invitation</h2>
      <p><b>Title:</b> ${rfpTitle}</p>
      <p><b>Description:</b> ${rfpDescription}</p>
      <p><b>Budget:</b> $${budget}</p>
      <p>Please reply with your proposal.</p>
    `;

    const previewUrl = await sendEmail(
      vendorEmail,
      "New RFP Invitation",
      htmlContent
    );

    res.status(200).json({ message: "Email sent", previewUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
