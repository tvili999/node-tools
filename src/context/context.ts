import { Request, Response } from "express";
import { Context } from "./types.js";
import EntryFactory from "./entryFactory.js";

export default class ContextImpl implements Context {
    private entries: Map<string, unknown> = new Map()

    constructor(
        private entryFactory: EntryFactory,
        private req: Request,
        private res: Response
    ) { }

    async get(key: string): Promise<unknown> {
        if(this.entries.has(key)) {
            return this.entries.get(key)
        }

        const entry = await this.entryFactory.build(key, this.req, this.res);
        this.entries.set(key, entry)

        return entry
    }
}