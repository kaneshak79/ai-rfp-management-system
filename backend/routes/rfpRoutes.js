// backend/routes/rfpRoutes.js
const express = require("express");
const router = express.Router();
const rfpController = require("../controllers/rfpController");
const { generateRFP } = require("../controllers/rfpController");



// CRUD
router.post("/", rfpController.createRFP);
router.get("/", rfpController.getAllRFPs);
router.get("/:id", rfpController.getRFPById);

// EMAIL route (this is the route you tried to add)
router.post("/send-email", rfpController.sendEmail);
// POST /api/rfps/generate
router.post("/generate", generateRFP);

module.exports = router;
