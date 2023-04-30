import { VectorStoreRetriever } from "langchain/dist/vectorstores/base";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Service } from "typedi";
import { getSplittedDocs } from "../helpers/document.helper"

@Service()
export class VectorStore {
    private Ready: Promise<boolean>;
    private store: MemoryVectorStore | undefined;
    private _retreiver: VectorStoreRetriever<MemoryVectorStore> | undefined;

    public get retreiver(): Promise<VectorStoreRetriever<MemoryVectorStore> | undefined> {
        return new Promise((resolve) => {
            this.Ready.then(() => {
                resolve(this._retreiver);
            })
        });
    }

    constructor() {
        console.log('Initializing Vector Store...');
        this.Ready = new Promise((resolve, reject) => {
            this.initDocs().then(docs => {
                MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings()).then(res => {
                    this.store = res;
                    this._retreiver = this.store.asRetriever();
                    console.log('Initializing Vector Store done');
                    resolve(true);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }

    private initDocs() {
        return getSplittedDocs(process.env.LOCAL_DOCSTORE_FILE ?? '', 500, 20);
    }
}