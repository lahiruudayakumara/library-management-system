import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    membershipType: {
      type: String,
      enum: ["Basic", "Bronze", "Premium", "Lifetime"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "LKR",
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["Succeeded", "Failed", "Pending"],
      required: true,
    },
    paymentProcessorTransactionId: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    receiptUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", PaymentSchema);
