const express = require("express");
const router = express.Router();
const spinController = require("../controllers/spin_controller");

router.get("/", spinController.getStart);
router.get('/prize/list', spinController.getPrizelist);
router.post('/upload/list', spinController.uploadList, spinController.processUpload);


module.exports = router;