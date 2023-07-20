import { Request, Response } from "express";
import ContextImpl from "./context.js";
import EntryFactory from "./entryFactory.js";
import { EntryBuilder, Context } from "./types.js";

export default class ContextFactory {
    private entryFactory = new EntryFactory()

    build(req: Request, res: Response): Context {
        return new ContextImpl(this.entryFactory, req, res)
    }

    addBuilder(key: string, builder: EntryBuilder) {
        this.entryFactory.addBuilder(key, builder)
    }
}