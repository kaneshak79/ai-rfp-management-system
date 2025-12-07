exports.compareProposals = async (req, res) => {
  try {
    const { proposals } = req.body;

    function calculateScore(proposal) {
      let score = 0;

      if (proposal.price) score += (100 - proposal.price);  
      if (proposal.deliveryDays) score += (50 - proposal.deliveryDays);
      if (proposal.experienceYears) score += proposal.experienceYears * 2;
      if (proposal.qualityRating) score += proposal.qualityRating * 10;
      if (proposal.compliance === "Yes") score += 20;

      return score;
    }

    const scorecard = proposals.map(p => ({
      vendor: p.vendor,
      score: calculateScore(p),
      reason: "Score calculated based on price, delivery, experience, quality, compliance."
    }));

    const winner = scorecard.reduce((a, b) => (a.score > b.score ? a : b)).vendor;

    res.json({
      winner,
      scorecard
    });

  } catch (error) {
    res.status(500).json({ error: "Comparison failed" });
  }
};
