const express = require("express");
const userModel = require.main.require("./models/userModel");
const userSupportModel = require.main.require("./models/UserSupportModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("userSupport/index");
});

module.exports = router;