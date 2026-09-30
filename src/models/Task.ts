import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  category: "travel" | "business" | "personal" | "other";
  status: "pending" | "booked";
}

const taskSchema = new Schema<ITask>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["travel", "business", "personal", "other"],
      default: "travel",
    },
    status: { type: String, enum: ["pending", "booked"], default: "pending" },
  },
  { timestamps: true}
);

export default model<ITask>("Task", taskSchema);
export type TaskCategory = ITask["category"];
export type TaskStatus = ITask["status"];