const express = require("express");
const { registerUser, loginUser, handleRequestPasswordReset, handleResetPassword, getUserDetails, depositUser, transferUser, userHistory } = require("../Controllers/userController");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", getUserDetails);
router.post("/", getUserDetails);
router.post("/initiate-deposit", depositUser);
router.post("/transfer", transferUser);
router.post("/fetchHistory", userHistory);
router.post("/reset-password/request", handleRequestPasswordReset);
router.post("/reset-password/verifyToken", handleResetPassword)
// router.post("/transPin/verify", setTransactionPin)
module.exports = router;