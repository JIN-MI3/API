const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/employee", async (req, res) => {
    res.render("pages/employee")
});

router.get("/spin", async (req, res) => {
    res.render("pages/spin")
});

module.exports = router;