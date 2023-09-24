const express = require("express");
const salesController = require("../controllers/sales.controller");

const router = express.Router();

router.post("/", salesController.createSales);
router.get("/", salesController.getAllSales);
router.put("/status/:id", salesController.updateSales);

module.exports = router;
