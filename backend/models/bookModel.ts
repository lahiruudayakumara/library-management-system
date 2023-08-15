import mongoose, { Document, Schema } from 'mongoose';

// Define the Book interface to represent a document in the Book collection
interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  genres: string[];
  description?: string;
  publishedDate?: Date;
  availableCopies: number;
  totalCopies: number;
  addedBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  isActive: boolean;
  checkedOutCopies: number;
  checkout: () => Promise<this>;
  returnBook: () => Promise<this>;
}

const BookSchema: Schema<IBook> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    genres: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: Date,
    },
    availableCopies: {
      type: Number,
      default: 1,
      min: [0, 'Available copies cannot be negative'],
    },
    totalCopies: {
      type: Number,
      required: true,
      min: [1, 'Total copies must be at least 1'],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for computed properties
BookSchema.virtual('checkedOutCopies').get(function (this: IBook) {
  return this.totalCopies - this.availableCopies;
});

// Methods for business logic (using arrow functions to maintain 'this' context)
BookSchema.methods.checkout = async function (): Promise<IBook> {
  if (this.availableCopies <= 0) {
    throw new Error('No copies available for checkout.');
  }
  this.availableCopies -= 1;
  return this.save();
};

BookSchema.methods.returnBook = async function (): Promise<IBook> {
  if (this.availableCopies >= this.totalCopies) {
    throw new Error('All copies are already in the library.');
  }
  this.availableCopies += 1;
  return this.save();
};

BookSchema.index({ title: 'text', author: 'text' });

BookSchema.index({ genres: 1 });

export default mongoose.model<IBook>('Book', BookSchema);