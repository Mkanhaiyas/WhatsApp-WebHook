import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    wa_id: { type: String, index: true, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    id: { type: String, unique: true, index: true },
    meta_msg_id: { type: String, index: true },
    text: { type: String, default: "" },
    type: { type: String, default: "text" },
    timestamp: { type: Date, required: true },
    status: {
      type: String,
      enum: ["sent", "delivered", "read", "none"],
      default: "none",
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model(
  "processed_messages",
  MessageSchema,
  "processed_messages"
);
