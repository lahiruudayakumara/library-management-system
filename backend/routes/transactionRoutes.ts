import { getBorrowedBooksReport, getHistory, getUserHistory, issueBook } from "../controllers/transactionController";

import express from "express";
import verifyRole from "../middlewares/roleBasedAccess";

// const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to get user transaction history
router.get("/history", verifyRole(["Librarian"]), getHistory);
router.get("/history", verifyRole(["Librarian"]), issueBook);
router.get("/history", verifyRole(["Librarian"]), getUserHistory);
router.get("/history", verifyRole(["Librarian"]), getBorrowedBooksReport);

module.exports = router;
