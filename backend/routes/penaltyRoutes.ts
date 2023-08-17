import { addPenalty, getPenalties } from "../controllers/penaltyController";

import express from "express";
import verifyRole from "../middlewares/roleBasedAccess";

// const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add",  verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), addPenalty);
router.get("/", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), getPenalties);

module.exports = router;
