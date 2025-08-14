export default function ChatItem({ chat, onClick }) {
  const lastMessage = chat.lastMessage?.text || "";
  const name = chat.user?.name || chat.wa_id;
  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 hover:bg-neutral-100 cursor-pointer border-b"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-300 flex items-center justify-center text-white font-bold">
        {name[0]}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        <div className="text-sm text-neutral-500 truncate">{lastMessage}</div>
      </div>
      <div className="text-xs text-neutral-400">{chat.lastMessage?.status}</div>
    </div>
  );
}
