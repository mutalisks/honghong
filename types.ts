import { InputValues } from "langchain/schema";


export interface DefaultChainInputs extends InputValues{
    input: string;
} 

export interface AIReply{
    reply:string,
    emotion:string,
    points:string,
}