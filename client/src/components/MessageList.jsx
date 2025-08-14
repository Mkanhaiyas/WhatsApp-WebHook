import { useEffect, useRef, useState } from "react";
import { API_URL, fetchMessages } from "../lib/api";
import io from "socket.io-client";
import MessageBubble from "./MessageBubble";

export default function MessageList({ wa_id, myNumber }) {
  const [messages, setMessages] = useState([]);
  const scrollerRef = useRef(null);

  useEffect(() => {
    fetchMessages(wa_id).then(setMessages);
    const s = io(API_URL);
    s.emit("join", wa_id);
    s.on("message:new", (msg) => {
      if (msg.wa_id === wa_id) setMessages((prev) => [...prev, msg]);
    });
    return () => s.disconnect();
  }, [wa_id]);

  useEffect(() => {
    if (scrollerRef.current)
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={scrollerRef} className="flex-1 overflow-y-auto chat-bg px-4 py-3">
      {messages.map((m) => (
        <MessageBubble
          key={m._id || m.id}
          m={m}
          wa_id={wa_id}
          isBusinessNumber={myNumber}
        />
      ))}
    </div>
  );
}
