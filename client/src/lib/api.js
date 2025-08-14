export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchChats() {
  const r = await fetch(`${API_URL}/api/chats`, { cache: "no-store" });
  return r.json();
}
export async function fetchMessages(wa_id) {
  const r = await fetch(`${API_URL}/api/chats/${wa_id}`, { cache: "no-store" });
  return r.json();
}
export async function sendMessage(wa_id, text) {
  const r = await fetch(`${API_URL}/api/messages/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wa_id, text }),
  });
  return r.json();
}
