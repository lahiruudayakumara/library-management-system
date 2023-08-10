import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  bookId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Book", 
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  },
  reservedDate: { 
    type: Date,
    default: Date.now
  },
  status: { 
    type: String, 
    enum: ["Active", "Cancelled"], 
    default: "Active" 
  },
});

export default mongoose.model("Reservation", ReservationSchema);
