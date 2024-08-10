import Chatbox from "@/components/chatbox";

export default function Home() {
  return (
    <main className='flex flex-col max-w-7xl h-screen m-auto justify-center items-center gap-4 p-4'>
      <h1 className='text-3xl font-bold'>Customer Support AI</h1>
      <Chatbox />
    </main>
  );
}
