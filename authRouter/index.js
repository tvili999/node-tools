const createAuthRouter = (states) => {
    let _states = {};
    for(const stateName in states) {
        _states[stateName] = (...handlerArgs) => {
            handlerArgs = [...handlerArgs];
            const handler = handlerArgs.pop();

            return async (req, res, next, ...args) => {
                const passes = await Promise.resolve(states[stateName](req, ...handlerArgs));
                if(passes) {
                    handler(req, res, next, ...args);
                }
                else {
                    next();
                }
            }
        }
    }

    return _states;
}

module.exports = createAuthRouter;