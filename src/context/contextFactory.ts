import { Request, Response } from "express";
import ContextImpl from "./context.js";
import EntryFactory from "./entryFactory.js";
import { EntryBuilder, Context, EntryKey } from "./types.js";

export default class ContextFactory {
    private entryFactory = new EntryFactory();

    build(req: Request, res: Response): Context {
        return new ContextImpl(this.entryFactory, req, res);
    }

    addBuilder<T = unknown>(
        key: string | EntryKey<T>,
        builder: EntryBuilder<T>
    ) {
        this.entryFactory.addBuilder(key, builder);
    }
}
