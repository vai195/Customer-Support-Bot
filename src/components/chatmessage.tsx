import { Bot, User } from "lucide-react";
import { ChatmessageProps } from "./chatbox";

function Chatmessage({ message }: { message: ChatmessageProps }) {
  if (message.role === "assistant") {
    return (
      <div className='flex justify-start items-center bg-slate-700 text-white px-4 py-3 rounded-lg gap-2 whitespace-pre-line'>
        <Bot size={30} /> {message.content}
      </div>
    );
  }
  if (message.role === "user") {
    return (
      <div className='flex justify-end items-center bg-slate-200 text-black px-4 py-3 rounded-lg gap-2 whitespace-pre-line text-right'>
        {message.content}
        <User size={30} />
      </div>
    );
  }
}

export default Chatmessage;
