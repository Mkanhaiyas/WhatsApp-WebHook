import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/whatsapp",
  MY_BUSINESS_NUMBER: process.env.MY_BUSINESS_NUMBER ?? "918329446654",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
};
