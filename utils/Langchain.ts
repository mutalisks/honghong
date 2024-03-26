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
    memory: () => memory.loadMemoryVariables({}),
  },
  {
    input: (previousOutput) => previousOutput.input,
    history: (previousOutput) => previousOutput.memory.history,
  },
  conversationPrompt,
  chatModelWithFunctions,
]);

export async function chatAndMessage(theme:string, newMessage:string) {
  const paramsTest: ChatInputs = {
    input: newMessage,
    scene: theme,
  }

  if(chatTimes === 0){
    memory.saveContext({input: "生气的原因:" + theme},{output:"哼"});
  }
  try{
    const response = await chain.invoke(paramsTest) as AIReply;
    chatTimes += 1;
    await memory.saveContext(
      {input: paramsTest.input}, 
      {output: response.reply}
    );
    // console.log(await memory.loadMemoryVariables({}));
    return response;
  }catch (error) {
    console.log('error: ', error)
    return error
  }
}