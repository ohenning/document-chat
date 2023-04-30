import { OpenAI } from "langchain/llms/openai";
import { StuffDocumentsChain, loadQAStuffChain } from "langchain/chains";
import { ChainValues } from "langchain/schema";
import { Document } from "langchain/document";
import { Service } from "typedi";

@Service()
export class LLMService {
    private llm: OpenAI;
    private docChain: StuffDocumentsChain;
    constructor() {
        console.log('Initializing LLM...');
        this.llm = new OpenAI();
        this.docChain = loadQAStuffChain(this.llm);
        console.log('Initializing LLM done');
    }

    public async queryDocChain(docs: Document[], query: string): Promise<ChainValues> {
        return this.docChain.call({input_documents: docs, question: query});
    }
}