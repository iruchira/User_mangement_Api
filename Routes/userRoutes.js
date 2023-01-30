const express = require("express");
const {
    addUsers,
    viewAllUsers,
} = require ("../Controllers/usersController.js");

const router = express.Router();
router.route("/").post(addUsers);
router.route("/").get(viewAllUsers);
module.exports = router;