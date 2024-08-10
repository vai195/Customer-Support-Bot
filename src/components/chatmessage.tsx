import { Bot, User } from "lucide-react";
import { ChatmessageProps } from "./chatbox";

function Chatmessage({ message }: { message: ChatmessageProps }) {
  if (message.role === "assistant") {
    return (
      <div className='flex justify-start items-center bg-slate-700 text-white px-4 py-3 rounded-lg gap-2 '>
        <Bot size={20} className='shrink-0' />{" "}
        <p className='whitespace-pre-line'>{message.content}</p>
      </div>
    );
  }
  if (message.role === "user") {
    return (
      <div className='flex justify-end items-center bg-slate-200 text-black px-4 py-3 rounded-lg gap-2 text-right'>
        <p className='whitespace-pre-line'>{message.content}</p>
        <User className='shrink-0' size={20} />
      </div>
    );
  }
}

export default Chatmessage;
