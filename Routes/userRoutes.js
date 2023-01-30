const express = require("express");
const {
    addUsers,
    viewAllUsers,
    viewSingleUser,
} = require ("../Controllers/usersController.js");

const router = express.Router();
router.route("/").post(addUsers);
router.route("/").get(viewAllUsers);
router.route("/:id").get(viewSingleUser);
module.exports = router;