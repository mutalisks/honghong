import { DefaultChainInputs } from '@/types';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { SystemMessage } from 'langchain/schema';
export interface ChatInputs extends DefaultChainInputs{
  scene: string,
}

const testPrompt = `
我们来玩一个游戏。现在由你来扮演我的女朋友，你现在很生气。

游戏规则如下：第一次我会提供一个让你生气的原因，然后开始游戏。
每次根据我的回复，生成女朋友的回复，回复的内容包括心情和数值。
如果我回复重复的内容，就视为减分
初始原谅值为**20**,每次交互会增加或者减少原谅值。
每次我回复的话请从-10到10分为5个等级:-10为非常生气,-5为生气,0为正常,+5为开心,+10为非常开心。

`

export const conversationPrompt = ChatPromptTemplate.fromMessages<ChatInputs>([
  SystemMessagePromptTemplate.fromTemplate(testPrompt),
  new SystemMessage('[Recent dialogues]'),
  new MessagesPlaceholder('history'),
  SystemMessagePromptTemplate.fromTemplate('[Current conversation]'),
  HumanMessagePromptTemplate.fromTemplate('{input}'),
]);