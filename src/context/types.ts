import { Request, Response } from "express";

export interface EntryKey<T> extends Symbol {}

export type EntryBuilder<T = unknown> = (
    req: Request,
    res: Response
) => Promise<T>;

export interface Context {
    get<T = unknown>(key: string | EntryKey<T>): Promise<T>;
}
