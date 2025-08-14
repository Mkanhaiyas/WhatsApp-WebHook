import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  wa_id: { type: String, unique: true, index: true, required: true },
  name: { type: String, default: "" },
});

export const User = mongoose.model("users", UserSchema);
