const express = require("express");
const router = express.Router();
const { compareProposals } = require("../controllers/aiController");

router.post("/compare", compareProposals);

module.exports = router;
