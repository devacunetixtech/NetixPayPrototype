const express = require("express");
const { registerUser, loginUser, findUser } = require("../Controllers/userController");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.post("/",findUser);
  
module.exports = router;