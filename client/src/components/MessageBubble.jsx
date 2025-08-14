import { DeliveredIcon, ReadIcon, SentIcon } from "./Icons";

export default function MessageBubble({ m, isBusinessNumber }) {
  const isMe = m.from === isBusinessNumber;
  const time = new Date(m.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getTickIcon = () => {
    if (!isMe) return null;

    switch (m.status) {
      case "sent":
        return <SentIcon />;
      case "delivered":
        return <DeliveredIcon />;
      case "read":
        return (
          <span className="text-[#007BFC]">
            <ReadIcon />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bubble ${isMe ? "me ml-auto" : "them"} my-3`}>
      <div className="whitespace-pre-wrap break-words text-sm">{m.text}</div>
      <div className="flex items-center gap-1 text-[11px] text-[#667781] absolute right-2 bottom-1">
        <span>{time}</span>
        {getTickIcon()}
      </div>
    </div>
  );
}
