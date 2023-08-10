import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController";
import express, { Router } from "express";

import verifyRole from "../middlewares/roleBasedAccess";

const router = express.Router();

// Public routes
router.get("/all", getAllBooks);
router.get("/:id", getBookById);

// Private routes
router.post("/add", verifyRole(["Librarian"]), addBook);
router.put("/:id", verifyRole(["Librarian"]), updateBook);
router.delete("/:id", verifyRole(["Librarian"]), deleteBook);

// Recommendations route
// bookRouter.get('/recommendations', getRecommendations);

export default router;
