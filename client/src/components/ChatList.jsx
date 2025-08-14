import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export default function ChatList() {
  const [chats, setChats] = useState([]);

  async function load() {
    const res = await fetch(`${API_URL}/api/chats`);
    const data = await res.json();
    setChats(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <aside className="border-r bg-white p-3 overflow-y-auto">
      <h1 className="text-xl font-semibold mb-3">Chats</h1>
      <ul className="space-y-2">
        {chats.map((c) => (
          <li key={c.wa_id}>
            <Link
              href={`/chat/${c.wa_id}`}
              className="flex items-center gap-3 p-2 rounded hover:bg-neutral-100"
            >
              <div className="size-10 rounded-full bg-emerald-200 grid place-items-center font-semibold">
                {c.user?.name?.[0] ?? c.wa_id.slice(-2)}
              </div>
              <div className="min-w-0">
                <div className="font-medium">{c.user?.name ?? c.wa_id}</div>
                <div className="text-sm text-neutral-600 truncate">
                  {c.lastMessage?.text}
                </div>
              </div>
              <div className="ml-auto text-xs text-neutral-500">
                {c.lastMessage?.status}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
