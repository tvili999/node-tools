const express = require("express");
const expressWs = require("express-ws");

module.exports = (componentName, config) => container => (container
    .inject(componentName, () => {
        const app = express();

        let listenArgs = [80];

        const _configs = [];
        const _routes = [];
        const _statics = [];
        const _fallbacks = [];

        const srv = {
            enableWs: () => {
                expressWs(app);
                return srv;
            },
            config: (handler) => {
                _configs.push(handler);
                return srv;
            },
            route: (handler) => {
                _routes.push(handler);
                return srv;
            },
            static: (handler) => {
                _statics.push(handler);
                return srv;
            },
            fallback: (handler) => {
                _fallbacks.push(handler);
                return srv;
            },
            listen: (..._listenArgs) => {
                listenArgs = [..._listenArgs];
                return srv;
            },
            run: async () => {
                const configs = [..._configs, ..._statics, ..._routes, ..._fallbacks];

                for(const config of configs)
                    await Promise.resolve(config(app));

                app.listen(...listenArgs);
            }
        }

        return srv;
    })
    .run(async ({ get }) => {
        const server = await get(componentName);
        await Promise.resolve(config?.(server));
        server.run();
    })
)