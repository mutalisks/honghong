import { ChatInputs, conversationPrompt} from "./prompt";
import { chatModelWithFunctions } from "./llm";
import { RunnableSequence} from "langchain/schema/runnable"
import { BufferMemory } from "langchain/memory";
import { AIReply } from "@/types";

const memory = new BufferMemory({
  returnMessages: true,
  inputKey: "input",
  outputKey: "output",
  memoryKey: "history",
  
});
let chatTimes = 0;

export const chain = RunnableSequence.from([
  {
    input: (initialInput) => initialInput.input,
    scene: (initialInput) => initialInput.scene,
    history: async () => (await memory.loadMemoryVariables({})).history,
  },
  conversationPrompt,
  chatModelWithFunctions,
]);

export async function chatAndMessage(theme:string, newMessage:string) {
  
  const newTheme = theme.replaceAll("あなた", "ユーザー");
  const paramsTest: ChatInputs = {
    input: newMessage,
    scene: newTheme,
  }

  try{
    const response = await chain.invoke(paramsTest) as AIReply;
    chatTimes += 1;
    await memory.saveContext(
      {input: paramsTest.input}, 
      {output: response.reply}
    );
    return response;
  }catch (error) {
    console.log('error: ', error)
    return error
  }
}