const arrayMap = require("js-utils/arrayMap");

const createStash = () => {
    const queryMakers = {};

    return {
        create: () => {
            let values = {};

            const stash = new Proxy({}, {
                get: (queries, name) => {
                    if(!queries[name]) {
                        const queryMaker = queryMakers[name];
                        if(!queryMaker)
                            throw `Query ${name} does not exist`;

                        queries[name] = async (...args) => {
                            const key = [...args];
                            if(!values[name])
                                values[name] = arrayMap();
                            
                            const cachedValue = values[name].get(key);
                            if(cachedValue)
                                return cachedValue;
                            
                            const value = await Promise.resolve(queryMaker(stash, ...args));
                            values[name].set(key, value);
                            return value;
                        };
                    }
                    return queries[name];
                }
            });

            return stash;
        },
        addQuery: (name, queryMaker) => {
            if(name in queryMakers)
                throw `Query ${name} already exists in stash`;
            
            queryMakers[name] = queryMaker;
        }
    }
};

module.exports = createStash;