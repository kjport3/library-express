const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Express Library",
    message: "Welcome to my Express Library",
  });
});

module.exports = router;
