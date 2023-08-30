import { Request, Response } from "express";
import { EntryBuilder, EntryKey } from "./types.js";

export default class EntryFactory {
    private builders: Map<string | EntryKey<unknown>, EntryBuilder> = new Map();

    addBuilder<T = unknown>(
        key: string | EntryKey<T>,
        builder: EntryBuilder<T>
    ): void {
        if (this.builders.has(key)) {
            throw `Builder "${key}" already exists in context builders`;
        }
        this.builders.set(key, builder);
    }
    async build<T = unknown>(
        key: string | EntryKey<T>,
        req: Request,
        res: Response
    ): Promise<T> {
        if (!this.builders.has(key)) {
            throw `Builder "${key}" does not exist`;
        }

        const builder = this.builders.get(key);

        return (await builder?.(req, res)) as T;
    }
}
