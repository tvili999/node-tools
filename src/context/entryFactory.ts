import { Request, Response } from "express";
import { EntryBuilder } from "./types.js";


export default class EntryFactory {
    private builders: Map<string, EntryBuilder> = new Map()

    addBuilder(key: string, builder: EntryBuilder): void {
        if(this.builders.has(key)) {
            throw `Builder "${key}" already exists in context builders`
        }
        this.builders.set(key, builder)
    }

    async build(key: string, req: Request, res: Response) : Promise<unknown> {
        if(!this.builders.has(key)) {
            throw `Builder "${key}" does not exist`
        }

        const builder = this.builders.get(key)

        return await builder?.(req, res);
    }
}