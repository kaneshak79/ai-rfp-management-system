const Vendor = require("../models/Vendor");

exports.addVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVendors = async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};
