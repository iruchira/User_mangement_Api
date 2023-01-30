const express = require("express");
const {
    addUsers,
} = require ("../Controllers/usersController.js");

const router = express.Router();
router.route("/").post(addUsers);
module.exports = router;