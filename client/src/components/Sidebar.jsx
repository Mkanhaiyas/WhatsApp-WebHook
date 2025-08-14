import { useEffect, useState } from "react";
import { fetchChats } from "../lib/api";
import { SearchIcon, WhatsApp } from "./Icons";

export default function Sidebar({ onSelect, activeWaId }) {
  const [chats, setChats] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchChats().then(setChats);
  }, []);

  const filtered = q
    ? chats.filter(
        (c) =>
          (c.user?.name || c.wa_id).toLowerCase().includes(q.toLowerCase()) ||
          (c.lastMessage?.text || "").toLowerCase().includes(q.toLowerCase())
      )
    : chats;

  const sorted = [...filtered].sort((a, b) => {
    const timeA = a.lastMessage?.timestamp
      ? new Date(a.lastMessage.timestamp).getTime()
      : 0;
    const timeB = b.lastMessage?.timestamp
      ? new Date(b.lastMessage.timestamp).getTime()
      : 0;
    return timeB - timeA;
  });

  return (
    <aside
      className={`
        flex flex-col bg-white md:border-r border-[#f5eadf] h-[100vh]
        w-full md:w-[100%] lg:w-[100%] px-3 py-2
        ${activeWaId ? "hidden md:flex" : "flex"}
      `}
    >
      <div className="px-4 pb-2 h-14 flex items-center justify-between">
        <div className="font-semibold text-[#1daa61]">
          <WhatsApp />
        </div>
      </div>

      <div className="px-3 pb-3 space-y-3">
        <div className="flex items-center gap-2 rounded-full px-3 py-2 bg-[#f7f5f3] border border-[#F0F2F5] hover:border-[#d1d7db] focus-within:bg-white focus-within:border focus-within:border-[#d1d7db] transition-colors">
          <SearchIcon className="text-[#8696A0]" />
          <input
            className="bg-transparent outline-none flex-1 text-sm"
            placeholder="Search or start a new chat"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-[#54656F]">
          {["All", "Unread", "Favourites", "Groups"].map((f) => (
            <span
              key={f}
              className={`px-3 py-1 rounded-full ${
                f === "All"
                  ? "bg-[#E7FCE3] text-[#1C5E1C]"
                  : "border border-[#54656F] text-[#54656F]"
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {sorted.map((c) => {
          const name = c.user?.name || c.wa_id;
          const last = c.lastMessage?.text || "";
          return (
            <button
              key={c.wa_id}
              onClick={() => onSelect(c.wa_id)}
              className={`w-full text-left px-3 py-3 flex items-center gap-3 hover:bg-[#f7f5f3] rounded-2xl my-1 ${
                activeWaId === c.wa_id ? "bg-[#f7f5f3]" : ""
              }`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-300 text-white text-xl font-semibold grid place-items-center">
                {name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium truncate text-[#111B21]">
                    {name}
                  </div>
                  <div className="ml-auto text-[12px] text-[#667781]">
                    {c.lastMessage?.timestamp
                      ? new Date(c.lastMessage.timestamp).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : ""}
                  </div>
                </div>
                <div className="text-[13px] text-[#667781] truncate">
                  {last}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
