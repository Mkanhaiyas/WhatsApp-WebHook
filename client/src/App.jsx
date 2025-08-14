import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { fetchChats } from "./lib/api";

const myNumber = import.meta.env.VITE_MY_NUMBER || "918329446654";

export default function App() {
  const [active, setActive] = useState(null);
  const [activeName, setActiveName] = useState("");

  useEffect(() => {
    if (!active) {
      setActiveName("");
      return;
    }
    fetchChats().then((chats) => {
      const c = chats.find((x) => x.wa_id === active);
      setActiveName(c?.user?.name || active);
    });
  }, [active]);

  const isMobile = useMemo(
    () => window.matchMedia("(max-width: 767px)").matches,
    []
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={`${
          isMobile && active ? "hidden" : "flex"
        } flex-col w-full md:w-[30%] border-r border-[#f7f5f3]`}
      >
        <Sidebar onSelect={setActive} activeWaId={active} />
      </div>

      <div
        className={`${isMobile && !active ? "hidden" : "flex"} flex-col flex-1`}
      >
        {active ? (
          <>
            <ChatHeader
              wa_id={active}
              name={activeName}
              onBack={() => setActive(null)}
            />
            <MessageList wa_id={active} myNumber={myNumber} />
            <MessageInput wa_id={active} />
          </>
        ) : (
          <div className="chat-bg flex items-center justify-center flex-1">
            <div className="text-center px-8">
              <div className="text-2xl text-[#41525D] mb-2">
                Keep your phone connected
              </div>
              <div className="text-[#667781]">
                WhatsApp connects to your phone to sync your messages. To reduce
                data usage, connect your phone to Wi-Fi.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
