module.exports = (componentName, { init, run, stages }) => container => (container
    .inject(componentName, () => {
        const _handlers = {};

        const api = async () => {
            let configs = [];
            for(const stage of stages) {
                if(_handlers[stage])
                    configs = [...configs, ..._handlers[stage]];
            }

            const app = await Promise.resolve(init());

            for(const config of configs)
                await Promise.resolve(config(app));

            await Promise.resolve(run(app));
        };

        for(const stage of stages) {
            api[stage] = (handler) => {
                if(!_handlers[stage])
                    _handlers[stage] = [];
                _handlers[stage].push(handler);

                return api;
            };
        }

        return api;
    })
    .run(async ({ get }) => {
        const app = await get(componentName);
        await app();
    })
)