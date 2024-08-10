"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { ChatmessageProps } from "./chatbox";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  text: z.string().min(1).max(50),
});

export default function Chatform({
  messages,
  setMessages,
}: {
  messages: ChatmessageProps[];
  setMessages: Dispatch<SetStateAction<ChatmessageProps[]>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.text.trim()) return;

    // Add the user's message and the "Thinking..." placeholder
    setMessages((messages) => [
      ...messages,
      { role: "user", content: values.text },
      { role: "assistant", content: "Thinking..." },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ...messages,
          { role: "user", content: values.text },
        ]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (!response.body) {
        throw new Error("Response has no body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessageIndex: number;

      setMessages((messages) => {
        assistantMessageIndex = messages.length - 1;
        const updatedMessages = [...messages];
        updatedMessages[assistantMessageIndex] = {
          role: "assistant",
          content: "",
        };
        return updatedMessages;
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          const updatedMessages = [...messages];
          updatedMessages[assistantMessageIndex] = {
            ...updatedMessages[assistantMessageIndex],
            content: updatedMessages[assistantMessageIndex].content + text,
          };
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
    form.reset();
  }
  return (
    <div className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex gap-2 p-2 w-full'>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='text'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Ask a customer support bot a question'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            {form.formState.isSubmitting ? (
              <Loader2 className='animate-spin' />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
