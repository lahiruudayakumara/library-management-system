import { NextFunction, Request, Response } from "express";

import Book from "../models/bookModel";
import logger from "../utils/logger";

// Get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: books });
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
      { $sort: { borrowCount: -1 } }, // assuming borrowCount tracks book popularity
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
    const bookCount = await Book.countDocuments(); // Count the number of books in the collection
    res.status(200).json({ success: true, data: bookCount });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
