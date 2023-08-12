import { NextFunction, Request, Response } from "express";

import Member from "../models/memberModel";

// Register Member
export const registerMember = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const { name, email, membershipType } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const newMember = new Member({
      name,
      email,
      membershipType,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    await newMember.save();
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    next(error);
  }
};

// Get All Members
export const getAllMembers = async (req: any, res: any, next: NextFunction) => {
  try {
    const members = await Member.find()
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

// Get Member by ID
export const getMemberById = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

// Update Member
export const updateMember = async (req: any, res: any, next: NextFunction) => {
  try {
    const { name, email, membershipType } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember && existingMember._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        membershipType,
        updatedBy: req.user._id,
      },
      { new: true }
    );

    if (!updatedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    next(error);
  }
};

// Delete Member
export const deleteMember = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller to Renew Membership
export const renewMembership = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { durationInYears = 1 } = req.body;

    const member = await Member.findById(id);

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    member.membershipExpiry = new Date(
      new Date(member.membershipExpiry).setFullYear(
        new Date(member.membershipExpiry).getFullYear() + durationInYears
      )
    );

    await member.save();

    res.status(200).json({
      success: true,
      message: `Membership extended by ${durationInYears} year(s)`,
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to Get Members with Expired Memberships
export const getExpiredMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expiredMembers = await Member.find({
      membershipExpiry: { $lt: new Date() },
    });

    res.status(200).json({
      success: true,
      data: expiredMembers,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to Search Members
export const searchMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;

    const members = await Member.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { membershipType: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

// Controller to Fetch Members by Membership Type
export const getMembersByMembershipType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { membershipType } = req.params;

    const members = await Member.find({ membershipType });

    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

// Controller to Issue a Book
export const issueBook = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { bookId } = req.body;

    const member = await Member.findById(id);

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    const limits = {
      Basic: 3,
      Bronze: 5,
      Premium: 10,
    };

    if (member.booksIssued.length >= limits[member.membershipType]) {
      return res
        .status(400)
        .json({ success: false, message: "Book issue limit exceeded" });
    }

    member.booksIssued.push(bookId);

    await member.save();

    res.status(200).json({
      success: true,
      message: "Book issued successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to Return a Book
export const returnBook = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Member ID
    const { bookId } = req.body;

    const member = await Member.findById(id);

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    member.booksIssued = member.booksIssued.filter(
      (issuedBookId) => issuedBookId.toString() !== bookId
    );

    await member.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for Bulk Membership Update
export const bulkUpdateMemberships = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { memberIds, membershipType } = req.body;

    const result = await Member.updateMany(
      { _id: { $in: memberIds } },
      { $set: { membershipType, updatedBy: req.user._id } }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} members updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};
