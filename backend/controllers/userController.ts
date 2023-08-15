import { NextFunction, Request, Response } from "express";

import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

// Register user
export const registerUser = async (req: Request, res: Response | any) => {
  const {
    username,
    name,
    password,
    role,
  }: { username: string; name: string; password: string; role: string } =
    req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, name, password: hashedPassword, role });
    await user.save();

    logger.info(`New user registered: ${username}`);
    return res.status(201).send("User registered successfully");
  } catch (error: any) {
    logger.error(`Error during registration: ${error.message}`);
    return res.status(500).send("Server error");
  }
};

// Login user
export const loginUser = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  const { username, password }: { username: string; password: string } =
    req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(403).send("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    logger.info("JWT Token Generated");
    return res.status(200).send({ token });
  } catch (error: any) {
    logger.error(`Error during login: ${error.message}`);
    return res.status(500).send("Server error");
  }
};

// Fetch user details
export const getUserDetails = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) {
      return res.status(404).send("User not found.");
    }
    logger.info(`Fetched user details for: ${user.username}`);
    return res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    logger.error(`Error fetching user details: ${error.message}`);
    return res.status(500).send("Server error.");
  }
};

// Fetch all users
export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).send("No users found.");
    }
    logger.info(
      `Fetched user details for: ${users
        .map((user: any) => user.username)
        .join(", ")}`
    );
    return res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    logger.error(`Error fetching user details: ${error.message}`);
    return res.status(500).send("Server error.");
  }
};

// Fetch staff users
export const getStaffUsers = async (req: any, res: any) => {
  try {
    const users = await User.find(
      { role: { $in: ["Assistant", "Staff"] } },
      { username: 1, name: 1 }
    );
    if (!users || users.length === 0) {
      return res.status(404).send("No users found.");
    }
    logger.info(
      `Fetched user details for: ${users
        .map((user: any) => user.username)
        .join(", ")}`
    );
    return res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    logger.error(`Error fetching user details: ${error.message}`);
    return res.status(500).send("Server error.");
  }
};

// Get user count by role
export const getUserCount = async (
  req: Request<{ role: string }>,
  res: any,
  next: Function
) => {
  try {
    const { role }: { role: string } = req.params;

    const allUserCount = await User.countDocuments({ role });
    const activeUserCount = await User.countDocuments({ role, isActive: true });
    const deactiveUserCount = await User.countDocuments({
      role,
      isActive: false,
    });

    const data = {
      all: allUserCount,
      active: activeUserCount,
      deactive: deactiveUserCount,
    };
    logger.info(`${role} Active: ${data.active} Deactive: ${data.deactive}`);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    logger.error(`Error fetching user details: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
