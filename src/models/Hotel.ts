import { Schema, model, Document } from "mongoose";

interface IRoomType {
  name: string;
  pricePerNight: number;
  totalRooms: number;
}

export interface IHotel extends Document {
  name: string;
  location: string;
  description: string;
  amenities: string[];
  rooms: IRoomType[];
}

const roomTypeSchema = new Schema<IRoomType>(
  {
    name: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    totalRooms: { type: Number, required: true },
  },
  { _id: false }
);

const hotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, default: "" },
    amenities: [{ type: String }],
    rooms: [roomTypeSchema],
  },
  { timestamps: true }
);

export default model<IHotel>("Hotel", hotelSchema);