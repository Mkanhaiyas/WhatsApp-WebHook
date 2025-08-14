import { BackIcon } from "./Icons";

export default function ChatHeader({ wa_id, name, onBack }) {
  return (
    <header className="h-16 border-b border-[#f7f5f3] bg-white px-3 flex items-center">
      <button onClick={onBack} className="md:hidden mr-2">
        <BackIcon />
      </button>
      <div className="w-10 h-10 rounded-full bg-emerald-300 text-white text-xl font-semibold grid place-items-center">
        {(name || wa_id)[0]}
      </div>
      <div className="ml-3">
        <div className="font-medium text-[#111B21]">{name || wa_id}</div>
        <div className="text-[12px] text-[#1daa61]">online</div>
      </div>
    </header>
  );
}
