import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

export  const registerValidation = [
  check("username").notEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  check("role")
    .isIn(["Member", "Librarian", "Assistant", "Staff"])
    .withMessage("Invalid role specified"),
];

export const loginValidation = [
  check("username").notEmpty().withMessage("Username is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

export const validate = (req: any, res:any, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};
