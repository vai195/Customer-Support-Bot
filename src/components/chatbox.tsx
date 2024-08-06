"use client";

import { useEffect, useRef, useState } from "react";
import Chatform from "./chatForm";
import Chatmessage from "./chatmessage";
export interface ChatmessageProps {
  role: string;
  content: string;
}

function Chatbox() {
  const [messages, setMessages] = useState<ChatmessageProps[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='flex flex-col justify-between border h-[600px] min-w-[390px] rounded'>
      <div className='flex flex-col flex-grow gap-y-4 w-full p-2 overflow-y-auto'>
        {!messages ||
          (messages.length === 0 && (
            <Chatmessage
              message={{ role: "assistant", content: "Ask a Question" }}
            />
          ))}
        {messages &&
          messages.length > 0 &&
          messages.map((m, i) => <Chatmessage key={i} message={m} />)}
        <div ref={messagesEndRef} />
      </div>

      <Chatform messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default Chatbox;
