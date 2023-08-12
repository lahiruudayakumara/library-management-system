import { NextFunction, Request, Response } from "express";

const Book = require("../models/bookModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { default: logger } = require("../utils/logger");

export const getHistory = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  try {
    const history = await Transaction.find();

    res.status(200).json({ success: true, data: history });
    logger.info("Get Transaction History");
  } catch (error: any) {
    logger.error(`Transaction, ${error.message}`);
    next(error);
  }
};

export const issueBook = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  try {
    const { bookId, userId } = req.body;

    const transaction = new Transaction({ bookId, userId });
    await transaction.save();

    // Notify user via email
    const user = await User.findById(userId); // Assuming User model exists
    const book = await Book.findById(bookId);

    await sendEmail(
      user.email, // User's email
      "Book Issued Successfully",
      `Dear ${user.username}, the book "${book.title}" has been issued to you. Enjoy reading!`
    );

    res
      .status(201)
      .json({ success: true, message: "Book issued and email sent." });
  } catch (error) {
    next(error);
  }
};

export const getUserHistory = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  try {
    const history = await Transaction.find({ userId: req.user.id })
      .populate("bookId", "title author")
      .sort({ issuedDate: -1 });

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const getBorrowedBooksReport = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  try {
    const report = await Transaction.aggregate([
      { $group: { _id: "$bookId", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
    ]);

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

// Handle payment with Stripe
export const handlePayment = async (
  req: Request | any,
  res: Response | any,
  next: NextFunction
) => {
  try {
    const { amount, currency, source, description } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: source,
      confirm: true,
      description,
    });

    res.status(200).json({ message: "Payment successful", paymentIntent });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
