import {
    deleteUser,
    getAllUsers,
    getStaffUsers,
    getUserCount,
    getUserDetails,
    loginUser,
    registerUser,
    updateUser,
} from "../controllers/userController";
import express, { Router } from "express";

import { registerValidation } from "../validation/authValidator";
import verifyRole from "../middlewares/roleBasedAccess";

const router: Router = express.Router();

// Login route (removed validation as per your request)
router.post("/login", loginUser);

// CRUD operations for users
router.get(
  "/details",
  verifyRole(["Staff", "Librarian", "Admin"]),
  getUserDetails
);
router.post("/register", registerValidation, registerUser);
router.put("/update/:id", verifyRole(["Librarian", "Admin"]), updateUser);
router.delete("/delete/:id", verifyRole(["Admin"]), deleteUser);
router.get("/all", verifyRole(["Librarian", "Admin"]), getAllUsers);

// Get staff users route
router.get(
  "/all-staff",
  verifyRole(["Staff", "Librarian", "Admin", "Assistant"]),
  getStaffUsers
);

// Get user count by role route
router.get(
  "/count/:role",
  verifyRole(["Staff", "Librarian", "Admin"]),
  getUserCount
);

export default router;
