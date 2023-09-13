const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUserByEmail);
router.get("/:id", userController.getUserById);
router.get("/", userController.getUserByRole);

module.exports = router;
