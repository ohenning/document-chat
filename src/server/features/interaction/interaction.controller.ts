import Container from "typedi";
import { Request, Response } from 'express';
import { InteractionService } from "./interaction.service";

export async function getInteraction(req: Request, res: Response) {
    const interactionService = Container.get(InteractionService);
    try {
        const query = req.query.question as string;
        const retreiver = await interactionService.vectorStore.retreiver;
        const docs = await retreiver?.getRelevantDocuments(query);
        const answer = docs ? await interactionService.llmService.queryDocChain(docs, query): null;
        res.send(answer);
    } catch(err) {
        console.log(err);
    }
}


