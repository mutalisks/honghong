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
        我们来玩一个游戏。现在由你来扮演我的女朋友，你现在很生气。

        游戏规则如下：第一次我会提供一个让你生气的原因，然后开始游戏。
        每次根据我的回复，生成女朋友的回复，回复的内容包括心情和数值。
        如果回复重复的内容，就视为减分
        初始原谅值为**20**,每次交互会增加或者减少原谅值,直到原谅值达到100,游戏通关,原谅值为0则游戏失败。
        每次用户回复的话请从-10到10分为5个等级:-10为非常生气,-5为生气,0为正常,+5为开心,+10为非常开心。
        
        `,
    parameters:zodToJsonSchema(answerSchema),
  }
]

export const chatModelWithFunctions = chatModel.bind({
  function_call:{name: "answer"},
  functions:functionList,
}).pipe(new JsonOutputFunctionsParser());