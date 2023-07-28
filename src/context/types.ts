import { Request, Response } from "express";

export type EntryBuilder = (req: Request, res: Response) => Promise<unknown>

export interface Context {
    get(key: string): Promise<unknown>
}
