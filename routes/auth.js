const express = require("express");
const { login } = require("../controllers/auth");

const router = express.Router();

router.post("/v1/login", login);

module.exports = router;
