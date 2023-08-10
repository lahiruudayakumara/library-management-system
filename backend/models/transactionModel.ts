import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issuedDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
});

export default mongoose.model('Transaction', TransactionSchema);
