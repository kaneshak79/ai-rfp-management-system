import React, { useEffect, useState } from "react";
import axios from "axios";

const scoreProposal = (p) => {
  // price score (lower better)
  const priceScore = p.price ? 1 / p.price : 0;
  // deliveryScore (shorter better). Try parse days number from structuredData.deliveryTimeline
  let deliveryDays = 9999;
  if (p.structuredData?.deliveryTimeline) {
    const m = p.structuredData.deliveryTimeline.match(/\d+/);
    if (m) deliveryDays = parseInt(m[0],10);
  }
  const deliveryScore = deliveryDays ? 1 / deliveryDays : 0;
  const completeness = (p.structuredData?.warranty ? 0.1 : 0) + ((p.structuredData?.items?.length||0) > 0 ? 0.1 : 0);
  // weight scores
  return priceScore * 0.7 + deliveryScore * 0.2 + completeness * 0.1;
};

const CompareProposalsPage = () => {
  const [rfps, setRfps] = useState([]);
  const [selectedRfp, setSelectedRfp] = useState("");
  const [proposals, setProposals] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/rfps").then(r=>setRfps(r.data)).catch(console.error);
  },[]);

  const loadProposals = async (rfpId) => {
    setSelectedRfp(rfpId);
    if (!rfpId) { setProposals([]); setRecommendation(null); return; }
    try {
      const res = await axios.get(`http://localhost:5000/api/proposals/rfp/${rfpId}`);
      const data = res.data;
      setProposals(data);

      // compute scores
      let best = null;
      let bestScore = -Infinity;
      data.forEach(p=>{
        const s = scoreProposal(p);
        if (s > bestScore) { bestScore = s; best = p; }
      });

      if (best) {
        const vendorName = best.vendor?.name || best.vendorId || "Unknown vendor";
        const reason = `Vendor ${vendorName} scored highest (${bestScore.toFixed(4)}). Price: ${best.price || "N/A"}. Delivery: ${best.structuredData?.deliveryTimeline || "N/A"}. Warranty: ${best.structuredData?.warranty || "N/A"}.`;
        setRecommendation({ vendorName, score: bestScore, reason });
      } else {
        setRecommendation(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load proposals");
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Compare Proposals</h2>

      <div>
        <label>Select RFP: </label>
        <select onChange={(e)=>loadProposals(e.target.value)} value={selectedRfp}>
          <option value="">-- Select --</option>
          {rfps.map(r => <option value={r._id} key={r._id}>{r.title}</option>)}
        </select>
      </div>

      <div style={{marginTop:16}}>
        <h3>Proposals for Selected RFP</h3>
        <table border="1" cellPadding="6">
          <thead><tr><th>Vendor</th><th>Price</th><th>Proposal Text</th></tr></thead>
          <tbody>
            {proposals.map(p => (
              <tr key={p._id}>
                <td>{p.vendor?.name || p.vendorId || "N/A"}</td>
                <td>{p.price ? `$${p.price}` : (p.structuredData?.totalCost ? `$${p.structuredData.totalCost}` : "N/A")}</td>
                <td style={{maxWidth:400, whiteSpace:"normal"}}>{p.proposalText || JSON.stringify(p.structuredData)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{marginTop:20}}>
        <h3>AI Recommendation</h3>
        {recommendation ? (
          <div style={{background:"#f3f3f3", padding:12}}>
            <strong>Recommended Vendor:</strong> {recommendation.vendorName}<br/>
            <strong>Why:</strong> {recommendation.reason}
          </div>
        ) : <p>No recommendation (no proposals)</p>}
      </div>
    </div>
  );
};

export default CompareProposalsPage;
