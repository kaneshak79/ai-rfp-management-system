async function generateStructuredRFP(description) {
  return {
    items: [{ name: "Laptop", qty: 10, specs: "16GB RAM" }],
    budget: "$50000",
    deliveryTime: "30 days",
    paymentTerms: "Net 30",
    warranty: "1 year"
  };
}

async function parseVendorProposal(rawText) {
  return {
    price: "$48000",
    deliveryTime: "28 days",
    paymentTerms: "Net 30",
    warranty: "1 year",
    notes: rawText
  };
}

module.exports = { generateStructuredRFP, parseVendorProposal };
