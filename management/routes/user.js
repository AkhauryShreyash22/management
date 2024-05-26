const express = require("express");
const router = express.Router();

const {
    add_user,
    list_user,
    delete_user
} = require("../controllers/user.js");

router.post("/add_user", add_user);
router.get("/list_user", list_user);
router.delete("/delete_user", delete_user);

module.exports = router;