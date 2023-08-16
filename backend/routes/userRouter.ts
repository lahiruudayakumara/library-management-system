import express, { Router } from "express";
import { getAllUsers, getStaffUsers, getUserCount, getUserDetails, loginUser, registerUser } from "../controllers/userController";

import { registerValidation } from "../validation/authValidator";
import verifyRole from "../middlewares/roleBasedAccess";

const router: Router = express.Router();

// Register route
router.post("/register", registerValidation, registerUser);

// Login route (removed validation as per your request)
router.post("/login", loginUser);

// Get user details route
router.get(
    "/details",
    verifyRole(["Staff", "Librarian", "Admin"]),
    getUserDetails
);

// Get all users route
router.get(
    "/all",
    verifyRole(["Librarian", "Admin"]),
    getAllUsers
);

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

// Uncomment this block if needed in the future
// router.get(
//     "/admin-route",
//     authenticateUser,
//     authorizeRoles(["Librarian"]),
//     (req: Request, res: Response) => res.status(200).send("Admin route accessed")
// );

export default router;
