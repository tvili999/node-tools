const createContext = () => {
    let contextBuilders = {};

    const middleware = (req, res, next) => {
        if(req.context)
            throw "Context middleware already exists";

        req.context = new Proxy({}, {
            get: (cache, name) => {
                if(name in cache)
                    return cache[name];
                if(!contextBuilders[name])
                    throw "No such builder";

                cache[name] = contextBuilders[name](req, res);

                return cache[name];
            }
        })
        next();
    };

    middleware.add = (name, builder) => {
        if(contextBuilders[name])
            throw `Builder with name ${name} already exists`;
        contextBuilders[name] = builder;
    };

    return middleware;
}

createContext.component = (name, serverModule) => {
    if(typeof serverModule === "string") {
        return container => (container
            .inject(name, () =>  createContext())
            .run(async ({get}) => {
                const server = await get(serverModule);
                const context = await get(name);

                server.config(app => {
                    app.use(context.middleware);
                });
            })
        );
    }
    if(typeof serverModule === "function") {
        return container => (container
            .inject(name, () =>  createContext())
            .run(async (container) => {
                const context = await get(name);

                await Promise.resolve(serverModule(container, context));
            })
        );
    }

    throw "Second parameter is invalid"
}

module.exports = createContext;