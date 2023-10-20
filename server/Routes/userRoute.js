const express = require("express");
const { registerUser, loginUser, findUser, depositUser, transferUser } = require("../Controllers/userController");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.post("/",findUser);
router.post("/initiate-deposit", depositUser);
router.post("/transfer", transferUser);
module.exports = router;