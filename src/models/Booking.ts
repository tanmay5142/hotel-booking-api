import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  hotel: Types.ObjectId;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalPrice: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomType: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

bookingSchema.index({ hotel: 1, roomType: 1, checkIn: 1, checkOut: 1 });

export default model<IBooking>("Booking", bookingSchema);
