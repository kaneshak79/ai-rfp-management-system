require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const rfpRoutes = require("./routes/rfpRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const proposalRoutes = require("./routes/proposalRoutes");

const aiRoutes = require("./routes/aiRoutes");
const emailRoutes = require("./routes/emailRoutes");




const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/rfps", rfpRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/proposals", proposalRoutes);



app.use("/api/ai", aiRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));

