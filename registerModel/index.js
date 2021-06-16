module.exports = (name, { context, stash, functions }) => {
    for(const fn in functions)
        stash.addQuery(`${name}:${fn}`, (_, ...args) => functions[fn](...args));

    context.add(name, (req) => {
        let api = { };

        for(const fn in functions)
            api[fn] = (...args) => req.context.stash[`${name}:${fn}`](req, ...args);

        return api;
    })
}