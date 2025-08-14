import { Router } from "express";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import { ENV } from "../config/env.js";

const router = Router();

router.post("/send", async (req, res) => {
  const { wa_id, text } = req.body;
  if (!wa_id || !text)
    return res.status(400).json({ error: "wa_id and text required" });

  const now = new Date();
  const doc = await Message.create({
    id: wa_id,
    wa_id,
    from: ENV.MY_BUSINESS_NUMBER,
    to: wa_id,
    text,
    type: "text",
    timestamp: now,
    status: "sent",
  });

  await User.updateOne(
    { wa_id },
    { $setOnInsert: { name: wa_id } },
    { upsert: true }
  );

  req.app.get("io").to(wa_id).emit("message:new", doc);

  res.json(doc);
});

router.post("/status", async (req, res) => {
  const { id, meta_msg_id, status } = req.body;
  const query = {};
  if (id) query.id = id;
  if (meta_msg_id) query.meta_msg_id = meta_msg_id;

  const updated = await Message.updateMany(query, { $set: { status } });
  res.json({ matched: updated.matchedCount, modified: updated.modifiedCount });
});

export default router;
