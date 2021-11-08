const express = require("express");
const userEndPoints = require("../../Controller/user");
const router = express.Router();
router.get("/", userEndPoints.getUsers);
router.get("/:email/:password", userEndPoints.validateUser);
router.post("/", userEndPoints.createUser);
router.patch("/:email", userEndPoints.updateUser);
router.delete("/:email", userEndPoints.deleteUser);
module.exports = router;
