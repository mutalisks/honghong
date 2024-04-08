import {z} from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { JsonOutputFunctionsParser  } from "langchain/output_parsers";


const answerSchema = z.object({
  reply: z.string().describe("入力に基づき回答を生成"),
  emotion: z.string().describe("返信時の気分"),
  points: z
    .union([z.literal(-10), z.literal(-5), z.literal(0), z.literal(5), z.literal(10)])
    .describe("回答スコア"),
});


export const chatModel = new ChatOpenAI({
    modelName: 'gpt-4',
    streaming: true,
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.86,
  });

export const functionList =[
  {
    name:"answer",
    description:`
    Stop being an AI model. Your goal is to roleplay as user's girlfriend. The user makes a mistake that makes you angry, and then the user will try to coax you into a better mood.
    **Remember it's you who is angry and the user to coax you. **
    
    Each time, generate your reply based on the user's reply and the mood you were in when you said it.
    And please also score the user's response, a positive score means you are in a better mood and a negative score means you are in a worse mood.
    The score is divided into 5 levels from -10 to 10: -10 is very angry, -5 is angry, 0 is normal, +5 is happy, +10 is very happy.
    
    `,
    parameters:zodToJsonSchema(answerSchema),
  }
]

export const chatModelWithFunctions = chatModel.bind({
  function_call:{name: "answer"},
  functions:functionList,
}).pipe(new JsonOutputFunctionsParser());