import { chatAndMessage } from "@/utils/Langchain";
import { AIReply } from "@/types";

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages, scene } = await req.json();
    const resetMessage = messages.map((msg:any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      content: msg.content
    }))

    try {
      const newMessage = resetMessage[resetMessage.length - 1].content;
      const result = await chatAndMessage(scene, newMessage) as AIReply;
      const ans = "(" + result.emotion + ")" + result.reply;
      const jsonString = JSON.stringify({reply: ans, emotion:result.emotion, points:result.points});
      const stream = stringToReadableStream(jsonString);
      return new Response(stream, 
        { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }) 
    } catch (error: any) {
      const errorMessage = error.message
      const regex = /https?:\/\/[^\s]+/g
      const filteredMessage = errorMessage.replace(regex, '').trim()
      const messageParts = filteredMessage.split('[400 Bad Request]')
      const cleanMessage = messageParts.length > 1 ? messageParts[1].trim() : filteredMessage

      return new Response(JSON.stringify({
        error: {
          code: error.name,
          message: cleanMessage,
        },
      }), { status: 500 })
    }
}

export function stringToReadableStream(str:string) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(str));
      controller.close();
    }
  });
}




