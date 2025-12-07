import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header style={{ padding: "1rem", background: "#f0f0f0" }}>
        <h2>AI-Powered RFP Management System</h2>
        <nav style={{ marginTop: "0.5rem" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/rfps" style={{ marginRight: "1rem" }}>RFPs</Link>
          <Link to="/vendors" style={{ marginRight: "1rem" }}>Vendors</Link>
          <Link to="/proposals" style={{ marginRight: "1rem" }}>Proposals</Link>
          <Link to="/compare">Compare</Link>
        </nav>
      </header>
      <main style={{ padding: "1rem" }}>
        <Outlet /> {/* This will render the page content */}
      </main>
    </div>
  );
};

export default Layout;
