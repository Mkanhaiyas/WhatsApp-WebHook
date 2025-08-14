import express from "express";
import cors from "cors";
import http from "http";
import { ENV } from "./config/env.js";
import { connectMongo } from "./db/mongodb.js";
import chatsRouter from "./routes/chat.js";
import messagesRouter from "./routes/messages.js";
import { configureIO } from "./sockets/io.js";
// import fs from "fs";
// import path from "path";
// import mongoose from "mongoose";
// import { Message } from "./models/Message.js";
// import { User } from "./models/User.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/chats", chatsRouter);
app.use("/api/messages", messagesRouter);

const server = http.createServer(app);
const io = configureIO(server);
app.set("io", io);

/* Script for webhook data */
// const payloadDir = path.join(process.cwd(), "src", "payLoadDir");

// async function upsertUser(wa_id, name) {
//   await User.updateOne(
//     { wa_id },
//     { $setOnInsert: { name: name ?? wa_id } },
//     { upsert: true }
//   );
// }

// async function handleMessagePayload(json) {
//   const value = json?.metaData?.entry?.[0]?.changes?.[0]?.value;
//   if (!value) return;

//   const contact = value.contacts?.[0];
//   const messages = value.messages ?? [];
//   const phoneMeta = value.metadata;

//   const wa_id = contact?.wa_id ?? messages?.[0]?.from; // sender's number
//   const name = contact?.profile?.name;
//   const myNumber = phoneMeta?.display_phone_number ?? MY_BUSINESS_NUMBER;

//   if (wa_id) await upsertUser(wa_id, name);

//   for (const m of messages) {
//     const doc = {
//       wa_id,
//       from: m.from,
//       to: myNumber,
//       id: m.id,
//       meta_msg_id: m.id,
//       text: m.text?.body ?? "",
//       type: m.type ?? "text",
//       timestamp: new Date(Number(m.timestamp) * 1000),
//       status: "sent", // initial best-guess; will be corrected by status payloads
//     };
//     await Message.updateOne(
//       { id: doc.id },
//       { $setOnInsert: doc },
//       { upsert: true }
//     );
//   }
// }

// async function handleStatusPayload(json) {
//   const value = json?.metaData?.entry?.[0]?.changes?.[0]?.value;
//   if (!value) return;
//   const statuses = value.statuses ?? [];

//   for (const s of statuses) {
//     const id = s.id || s.meta_msg_id;
//     const status = (s.status ?? "none").toLowerCase();
//     await Message.updateMany(
//       { $or: [{ id }, { meta_msg_id: id }] },
//       { $set: { status } }
//     );
//   }
// }

// async function run() {
//   await mongoose.connect(ENV.MONGO_URI);
//   console.log("Connected to Mongo");

//   const files = fs.readdirSync(payloadDir).filter((f) => f.endsWith(".json"));
//   for (const f of files) {
//     const full = path.join(payloadDir, f);
//     const raw = fs.readFileSync(full, "utf-8");
//     const json = JSON.parse(raw);

//     const hasMessages =
//       !!json?.metaData?.entry?.[0]?.changes?.[0]?.value?.messages;
//     const hasStatuses =
//       !!json?.metaData?.entry?.[0]?.changes?.[0]?.value?.statuses;

//     if (hasMessages) {
//       console.log("Importing messages from", f);
//       await handleMessagePayload(json);
//     } else if (hasStatuses) {
//       console.log("Applying statuses from", f);
//       await handleStatusPayload(json);
//     } else {
//       console.log("Skipping", f, "(no messages/statuses)");
//     }
//   }

//   console.log("Done.");
//   await mongoose.disconnect();
// }

// run().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });

(async () => {
  await connectMongo();
  server.listen(ENV.PORT, () => console.log(`API on :${ENV.PORT}`));
})();
