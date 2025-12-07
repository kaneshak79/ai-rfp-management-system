const express = require("express");
const router = express.Router();
const proposalController = require("../controllers/proposalController");

router.post("/", proposalController.submitProposal);
router.get("/", proposalController.getAllProposals);
router.get("/rfp/:rfpId", proposalController.getProposalsByRfp);

module.exports = router;
