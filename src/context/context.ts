import { Request, Response } from "express";
import { Context, EntryKey } from "./types.js";
import EntryFactory from "./entryFactory.js";

export default class ContextImpl implements Context {
    private entries: Map<string | EntryKey<unknown>, unknown> = new Map();

    constructor(
        private entryFactory: EntryFactory,
        private req: Request,
        private res: Response
    ) {}

    async get<T = unknown>(key: string | EntryKey<T>): Promise<T> {
        if (this.entries.has(key)) {
            return this.entries.get(key) as T;
        }

        const entry = await this.entryFactory.build(key, this.req, this.res);
        this.entries.set(key, entry);

        return entry as T;
    }
}
