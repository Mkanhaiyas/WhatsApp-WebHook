import mongoose from "mongoose";
import { ENV } from "../config/env.js";

export const connectMongo = async () => {
  await mongoose.connect(ENV.MONGO_URI, { dbName: "whatsapp" });
  console.log("Mongo connected");
};
