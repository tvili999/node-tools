const createAuthRouter = (states) => {
    let _states = {};
    for(const stateName in states) {
        _states[stateName] = handler => async (req, res, next, ...args) => {
            const passes = await Promise.resolve(states[stateName](req));
            if(passes) {
                handler(req, res, next, ...args);
            }
            else {
                next();
            }
        }
    }

    return _states;
}

module.exports = createAuthRouter;