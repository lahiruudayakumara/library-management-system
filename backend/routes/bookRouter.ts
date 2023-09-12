import {
  addBook,
  deleteBook,
  filterBooks,
  getAllBooks,
  getBookById,
  getBookCount,
  updateBook,
} from "../controllers/bookController";
import express, { Router } from "express";

import verifyRole from "../middlewares/roleBasedAccess";

const router = express.Router();

// Public routes
router.get("/all", getAllBooks);
router.get("/:id", getBookById);

// Private routes
router.post("/add", verifyRole(["Librarian", "Admin", "Assistant"]), addBook);
router.put("/:id", verifyRole(["Librarian", "Admin", "Assistant"]), updateBook);
router.delete("/:id", verifyRole(["Librarian", "Admin", "Assistant"]), deleteBook);
router.post("/filter", verifyRole(["Assistant", "Librarian", "Admin"]), filterBooks);

// Get Book count route
router.get("/count", verifyRole(["Assistant", "Librarian", "Admin"]), getBookCount);

// Recommendations route
// bookRouter.get('/recommendations', getRecommendations);

export default router;
