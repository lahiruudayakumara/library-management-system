import {
  bulkUpdateMemberships,
  deleteMember,
  getAllMembers,
  getExpiredMembers,
  getMemberById,
  getMembersByMembershipType,
  issueBook,
  registerMember,
  renewMembership,
  returnBook,
  searchMembers,
  updateMember,
} from "../controllers/memberController";

import express from "express";
import verifyRole from "../middlewares/roleBasedAccess";

const router = express.Router();

// Member CRUD operations
router.post("/register", verifyRole(["Librarian", "Admin", "Assistant"]), registerMember);
router.get("/", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), getAllMembers);
router.get("/:id", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), getMemberById);
router.put("/:id", verifyRole(["Librarian", "Admin", "Assistant"]), updateMember);
router.delete("/:id", verifyRole(["Librarian", "Admin", "Assistant"]), deleteMember);

// Membership-specific routes
router.post("/:id/renew", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), renewMembership);
router.get("/type/:membershipType", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), getMembersByMembershipType);
router.get("/expired", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), getExpiredMembers);
router.get("/search", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), searchMembers);

// Book management routes
router.post("/:id/issue-book", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), issueBook);
router.post("/:id/return-book", verifyRole(["Staff", "Librarian", "Admin", "Assistant"]), returnBook);

// Bulk operations
router.put("/bulk-update", bulkUpdateMemberships);

export default router;
