import { useState } from "react";
import { EmojiIcon, AttachIcon, SendIcon } from "./Icons";
import { sendMessage } from "../lib/api";

export default function MessageInput({ wa_id }) {
  const [text, setText] = useState("");

  async function onSend(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    await sendMessage(wa_id, value);
    setText("");
  }

  return (
    <div className="chat-bg">
      <form
        onSubmit={onSend}
        className="h-14 mx-2 mb-4 bg-white rounded-full px-3 flex items-center gap-3"
      >
        <button type="button" className="text-black">
          <AttachIcon />
        </button>
        <button type="button" className="text-black">
          <EmojiIcon />
        </button>

        <input
          className="flex-1 rounded-xl text-md px-2 py-2 outline-none"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-[#1daa61] text-white rounded-full w-10 h-10 grid place-items-center">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
