import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { VectorStoreRetriever } from "langchain/vectorstores/base";


export async function getSplittedDocs(path: string, chunkSize: number, chunkOverlap: number): Promise<Document[]> {
    const loader = new PDFLoader(path, {
        splitPages: false,
    });
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: chunkSize,
        chunkOverlap: chunkOverlap,
      });
    const docs = await loader.load();
    return splitter.splitDocuments(docs);
}

export async function getRelevantDocs(retreiver: VectorStoreRetriever, query: string): Promise<Document[]> {
    return retreiver.getRelevantDocuments(query);
}
