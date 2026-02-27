const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const {
    createManager,
    getManagers,
    deleteManager,
    updateManager
} = require("../controller/manager/manager.controller");

router.post("/", authMiddleware, createManager);
router.get("/", authMiddleware, getManagers);
router.delete("/:id", authMiddleware, deleteManager);
router.put("/:id", authMiddleware, updateManager);

module.exports = router;