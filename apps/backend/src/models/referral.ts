import { Document, Schema, model } from "mongoose";

export interface IReferral extends Document {
  referrerWallet: string;
  referredWallets: string[];
  referredCode: string;
  count: number;
}

const referralSchema = new Schema<IReferral>(
  {
    referrerWallet: {
      type: String,
      required: true,
      unique: true,
    },
    referredCode: {
      required: true,
      type: String,
    },
    referredWallets: {
      type: [String],
      default: [],
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Referral = model<IReferral>("Referral", referralSchema);
