const express = require("express");
const router = express.Router();

/* 
    Setup route
*/
const spinRoute = require("./spin_route");


/* 
    link route API
*/
router.use("/spin", spinRoute);


module.exports = router;