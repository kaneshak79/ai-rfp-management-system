import React, { useEffect, useState } from "react";
import axios from "axios";

const VendorReplyPage = () => {
  const [rfps, setRfps] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ rfpId: "", vendorId: "", rawText: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/rfps").then(r => setRfps(r.data)).catch(console.error);
    axios.get("http://localhost:5000/api/vendors").then(r => setVendors(r.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rfpId || !form.vendorId || !form.rawText) return alert("All fields required");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/parse/parse-proposal", form);
      alert("Proposal parsed & saved.");
      console.log(res.data);
      setForm({ rfpId: "", vendorId: "", rawText: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to parse/save proposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simulate Vendor Reply</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RFP</label>
          <select value={form.rfpId} onChange={(e)=>setForm({...form, rfpId: e.target.value})}>
            <option value="">Select RFP</option>
            {rfps.map(r=> <option value={r._id} key={r._id}>{r.title}</option>)}
          </select>
        </div>

        <div>
          <label>Vendor</label>
          <select value={form.vendorId} onChange={(e)=>setForm({...form, vendorId: e.target.value})}>
            <option value="">Select Vendor</option>
            {vendors.map(v=> <option value={v._id} key={v._id}>{v.name}</option>)}
          </select>
        </div>

        <div>
          <label>Vendor Reply (paste email body)</label><br/>
          <textarea rows={10} value={form.rawText} onChange={(e)=>setForm({...form, rawText:e.target.value})} style={{width:"100%"}} />
        </div>

        <button type="submit" disabled={loading}>{loading ? "Parsing..." : "Parse & Save Proposal"}</button>
      </form>

      <p style={{marginTop:16, color:"#666"}}>
        Use example text: "We can supply 20 laptops at $900 each and 15 monitors at $150 each. Delivery in 25 days. Payment: net 30. Warranty: 1 year."
      </p>
    </div>
  );
};

export default VendorReplyPage;
