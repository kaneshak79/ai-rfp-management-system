import React, { useState } from "react";
import axios from "axios";

const SendRfpButton = ({ rfpId, rfpTitle, rfpDescription, vendorEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!vendorEmail) return alert("Vendor email required");
    setLoading(true);
    try {
      const body = {
        toEmail: vendorEmail,
        subject: `RFP: ${rfpTitle}`,
        message: `${rfpDescription}\n\nPlease reply with your proposal.`,
        rfpId
      };
      const res = await axios.post("http://localhost:5000/api/rfps/send-email", body);
      alert("Email sent successfully (backend confirmed).");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to send email. Check backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSend} disabled={loading}>
      {loading ? "Sending..." : "Send RFP to Vendor"}
    </button>
  );
};

export default SendRfpButton;
