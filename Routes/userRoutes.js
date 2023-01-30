const express = require("express");
const {
    addUsers,
    viewAllUsers,
    viewSingleUser,
    updateUser,
    deleteUser
} = require ("../Controllers/usersController.js");

const router = express.Router();
router.route("/").post(addUsers);
router.route("/").get(viewAllUsers);
router.route("/:id").get(viewSingleUser);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);
module.exports = router;