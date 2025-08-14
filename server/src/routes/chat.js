import { Router } from "express";
import { Message } from "../models/Message.js";

const router = Router();

router.get("/", async (_req, res) => {
  const pipeline = [
    { $sort: { timestamp: -1 } },
    { $group: { _id: "$wa_id", lastMessage: { $first: "$$ROOT" } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "wa_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        wa_id: "$_id",
        _id: 0,
        lastMessage: 1,
        user: { wa_id: 1, name: 1 },
      },
    },
  ];
  const chats = await Message.aggregate(pipeline);
  res.json(chats);
});

router.get("/:wa_id", async (req, res) => {
  const { wa_id } = req.params;
  const messages = await Message.find({ wa_id }).sort({ timestamp: 1 }).lean();
  res.json(messages);
});

export default router;
