import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RFPPage from "./pages/RFPPage";
import VendorPage from "./pages/VendorPage";
import ProposalPage from "./pages/ProposalPage";
import ProposalComparison from "./pages/ProposalComparison";
import VendorReplyPage from "./pages/VendorReplyPage";
import CompareProposalsPage from "./pages/CompareProposalsPage";

function App() {
  return (
    <Router>
      <header>
        <h1>AI-Powered RFP Management System</h1>
        <nav>
          <Link to="/">Home</Link>{" | "}
          <Link to="/rfps">RFPs</Link>{" | "}
          <Link to="/vendors">Vendors</Link>{" | "}
          <Link to="/proposals">Proposals</Link>{" | "}
          <Link to="/compare/693079fa53ee54ac37ea6ad9">Compare</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<h2>Welcome! Use the links above to navigate through the system.</h2>} />
        <Route path="/rfps" element={<RFPPage />} />
        <Route path="/vendors" element={<VendorPage />} />
        <Route path="/proposals" element={<ProposalPage />} />
        <Route path="/compare/:rfpId" element={<ProposalComparison rfpId="693079fa53ee54ac37ea6ad9" rfpTitle="Website Redesign" />} />
         <Route path="/vendor-reply" element={<VendorReplyPage />} />
        <Route path="/compare" element={<CompareProposalsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
