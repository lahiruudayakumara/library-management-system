import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    membershipType: {
      type: String,
      enum: ["Basic", "Bronze", "Premium"],
      default: "Basic",
    },
    membershipExpiry: {
      type: Date,
      default: () =>
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      required: true,
    },
    booksIssued: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        validate: {
          validator: function (val: any) {
            const limits: { [key: string]: number } = {
              Basic: 3,
              Bronze: 5,
              Premium: 10,
            };
            return val.length <= limits[(this as any).membershipType];
          },
          message: (props: any) =>
            `${props.path} exceeds the limit of issued books.`,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field to get the total number of books issued
MemberSchema.virtual("totalBooksIssued").get(function () {
  return this.booksIssued.length;
});

// Static method to find members by their membership type
MemberSchema.statics.findByMembershipType = function (membershipType) {
  return this.find({ membershipType });
};

// Pre-save hook to handle automatic expiry date for certain membership types
MemberSchema.pre("save", function (next) {
  if (this.isNew && this.membershipType === "Basic") {
    // Set a default expiry date for "Basic" membership (1 year from now)
    this.membershipExpiry = new Date();
    this.membershipExpiry.setFullYear(this.membershipExpiry.getFullYear() + 1);
  }
  next();
});

// Indexing the email field for faster lookup and unique constraint
MemberSchema.index({ email: 1 });

export default mongoose.model("Member", MemberSchema);
