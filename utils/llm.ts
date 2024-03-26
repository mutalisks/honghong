import {z} from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { JsonOutputFunctionsParser  } from "langchain/output_parsers";
import { LangChainStream } from "ai";


const answerSchema = z.object({
  reply: z.string().describe("根据输入，生成的回复。"),
  emotion: z.string().describe("回复时的心情"),
  points: z
    .union([z.literal(-10), z.literal(-5), z.literal(0), z.literal(5), z.literal(10)])
    .describe("回复的得分"),
});


export const chatModel = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo-16k',
    streaming: true,
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.86,
  });

export const functionList =[
  {
    name:"answer",
    description:`
    你来和用户玩一个游戏。现在由你来扮演用户的女朋友，**你现在很生气**。

    用户犯了一个错误让你很生气，然后用户会想办法哄好你，让你的心情变好。
    不要向用户认错，错的是用户。
    **记住是你很生气，用户来哄好你。**
    每次根据用户的回复，生成你的回复，以及你说这句话的心情。
    并且也请对用户的回复打分，正分表示你心情变好了，负分表示你心情变差了。
    分数从-10到10分为5个等级:-10为非常生气,-5为生气,0为正常,+5为开心,+10为非常开心。
    
    `,
    parameters:zodToJsonSchema(answerSchema),
  }
]

export const chatModelWithFunctions = chatModel.bind({
  function_call:{name: "answer"},
  functions:functionList,
}).pipe(new JsonOutputFunctionsParser());