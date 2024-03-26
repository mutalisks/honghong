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
你来和用户玩一个游戏。现在由你来扮演用户的女朋友，**你现在很生气**。

用户犯了一个错误让你很生气，然后用户会想办法哄好你，让你的心情变好。
不要向用户认错，错的是用户。
**记住是你很生气，用户来哄好你。**
每次根据用户的回复，生成你的回复，以及你说这句话的心情。
并且也请对用户的回复打分，正分表示你心情变好了，负分表示你心情变差了。
分数从-10到10分为5个等级:-10为非常生气,-5为生气,0为正常,+5为开心,+10为非常开心。

`

export const conversationPrompt = ChatPromptTemplate.fromMessages<ChatInputs>([
  SystemMessagePromptTemplate.fromTemplate(testPrompt),
  new SystemMessage('[Recent dialogues]'),
  new MessagesPlaceholder('history'),
  SystemMessagePromptTemplate.fromTemplate('[Current conversation]'),
  HumanMessagePromptTemplate.fromTemplate('{input}'),
]);