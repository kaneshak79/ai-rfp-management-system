import React, { useState, useEffect } from "react";
import axios from "axios";

const CompareProposalsPage = () => {
  const [rfps, setRfps] = useState([]);
  const [selectedRfp, setSelectedRfp] = useState("");
  const [proposals, setProposals] = useState([]);
  const [bestProposal, setBestProposal] = useState(null);

  useEffect(() => {
    // Fetch all RFPs
    axios.get("http://localhost:5000/api/rfps")
      .then((res) => setRfps(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedRfp) return;

    // Fetch proposals for selected RFP
    axios.get(`http://localhost:5000/api/proposals/rfp/${selectedRfp}`)
      .then((res) => {
        setProposals(res.data);

        // Sort proposals by price (lowest first)
        const sorted = [...res.data].sort((a, b) => a.price - b.price);
        setBestProposal(sorted[0] || null);
      })
      .catch((err) => console.error(err));
  }, [selectedRfp]);

  return (
    <div>
      <h1>Compare Proposals</h1>

      <label>Select RFP:</label>
      <select
        value={selectedRfp}
        onChange={(e) => setSelectedRfp(e.target.value)}
      >
        <option value="">-- Select RFP --</option>
        {rfps.map((r) => (
          <option key={r._id} value={r._id}>{r.title}</option>
        ))}
      </select>

      {proposals.length > 0 && (
        <div>
          <h3>Proposals for Selected RFP</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Price</th>
                <th>Proposal Text</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((p) => (
                <tr key={p._id}>
                  <td>{p.vendor?.name || "N/A"}</td>
                  <td>${p.price || "N/A"}</td>
                  <td>{p.proposalText || p.rawText || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {bestProposal && (
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>
              AI Recommendation: For RFP "{bestProposal.rfp?.title || 'N/A'}", vendor "
              {bestProposal.vendor?.name || 'N/A'}" offers the best price: $
              {bestProposal.price || 'N/A'}
            </p>
          )}
        </div>
      )}

      {proposals.length === 0 && selectedRfp && (
        <p>No proposals found for this RFP.</p>
      )}
    </div>
  );
};

export default CompareProposalsPage;
