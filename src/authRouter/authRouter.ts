import { NextFunction, Request, Response } from "express";

export interface AuthRouterConfigurator {
    [state: string]: (...args: unknown[]) => Promise<boolean>;
}

export interface AuthMiddlewares {
    [state: string]: (...args: unknown[]) => Function;
}

export default function createAuthRouter(states: AuthRouterConfigurator) {
    let _states: AuthMiddlewares = {};
    for (const stateName in states) {
        _states[stateName] = (...handlerArgs) => {
            handlerArgs = [...handlerArgs];
            const handler = handlerArgs.pop() as Function;

            return async (req: Request, res: Response, next: NextFunction, ...args: unknown[]) => {
                const passes = await Promise.resolve(states[stateName](req, ...handlerArgs));
                if (passes) {
                    handler(req, res, next, ...args);
                } else {
                    next();
                }
            };
        };
    }

    return _states;
}
