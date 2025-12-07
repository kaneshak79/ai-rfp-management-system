import React, { useState, useEffect } from "react";
import axios from "axios";

const ProposalPage = () => {
  const [rfps, setRfps] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [proposals, setProposals] = useState([]);

  const [form, setForm] = useState({
    rfpId: "",
    vendorId: "",
    proposalText: "",
    price: "",
  });

  useEffect(() => {
    fetchRfps();
    fetchVendors();
    fetchProposals();
  }, []);

  const fetchRfps = async () => {
    const res = await axios.get("http://localhost:5000/api/rfps");
    setRfps(res.data);
  };

  const fetchVendors = async () => {
    const res = await axios.get("http://localhost:5000/api/vendors");
    setVendors(res.data);
  };

  const fetchProposals = async () => {
    const res = await axios.get("http://localhost:5000/api/proposals");
    setProposals(res.data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/proposals", form);
      alert("Proposal submitted!");
      setForm({ rfpId: "", vendorId: "", proposalText: "", price: "" });
      fetchProposals();
    } catch (err) {
      console.error(err);
      alert("Error submitting proposal");
    }
  };

  return (
    <div>
      <h1>Proposals</h1>

      <form onSubmit={handleSubmit}>
        <label>RFP:</label>
        <select name="rfpId" value={form.rfpId} onChange={handleChange} required>
          <option value="">Select RFP</option>
          {rfps.map((r) => <option key={r._id} value={r._id}>{r.title}</option>)}
        </select>

        <label>Vendor:</label>
        <select name="vendorId" value={form.vendorId} onChange={handleChange} required>
          <option value="">Select Vendor</option>
          {vendors.map((v) => <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>

        <label>Proposal Text:</label>
        <textarea name="proposalText" value={form.proposalText} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} required />

        <button type="submit">Submit Proposal</button>
      </form>

      <h2>All Proposals</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>RFP</th>
            <th>Vendor</th>
            <th>Proposal Text</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p) => (
            <tr key={p._id}>
              <td>{p.rfp?.title || "N/A"}</td>
              <td>{p.vendor?.name || "N/A"}</td>
              <td>{p.proposalText}</td>
              <td>{p.price || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalPage;
