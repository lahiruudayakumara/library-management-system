import { NextFunction, Request, Response } from "express";

import Book from "../models/bookModel";
import logger from "../utils/logger";

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments();

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      success: true,
      data: books,
      pagination: {
        currentPage: page,
        totalPages,
        totalBooks,
        limit,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add a new book
export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }
    res.status(200).json({ success: true, data: book });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Recommendation Book
export const getRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const recommendations = await Book.aggregate([
      { $match: { availableCopies: { $gt: 0 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json({ success: true, data: recommendations });
  } catch (error: any) {
    logger.error(error.message);
    next(error);
  }
};

// Get book count
export const getBookCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalBooks = await Book.countDocuments();
    res.status(200).json({ success: true, data: totalBooks });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// Search books
export const filterBooks = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.body

    const books = await Book.find({
      isbn: { $regex: search, $options: "i" },
    });

    res.status(200).json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
};
