import { Inject, Service } from "typedi";
import { LLMService } from "../../services/llm.service";
import { VectorStore } from "../../services/vectorStore.service";

@Service()
export class InteractionService {
    constructor(
        @Inject() public llmService: LLMService,
        @Inject() public vectorStore: VectorStore,
    ) {}
}