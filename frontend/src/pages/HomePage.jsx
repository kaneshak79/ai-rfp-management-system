import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>AI-Powered RFP Management System</h1>
      <nav style={{ margin: "1rem 0" }}>
        <Link to="/rfps" style={{ marginRight: "1rem" }}>RFPs</Link>
        <Link to="/vendors" style={{ marginRight: "1rem" }}>Vendors</Link>
        <Link to="/proposals" style={{ marginRight: "1rem" }}>Proposals</Link>
        <Link to="/compare">Compare</Link>
      </nav>
      <p>Welcome! Use the links above to navigate through the system.</p>
    </div>
  );
};

export default HomePage;
