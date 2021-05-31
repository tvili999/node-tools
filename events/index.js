const createContext = () => {
    const events = {};

    return {
        on: (name, handler) => {
            if(!(events[name] || []).includes(handler))
                events[name] = [...(events[name] || []), handler];
        },
        off: (name, handler) => {
            events[name] = (events[name] || []).filter(x => x !== handler);
        },
        fire: (name, ...args) => {
            if(events[name])
                for(const event of events[name])
                    event(...args);
        }
    }
}

createContext.component = name => container => (container
    .inject(name, () => {
        return createContext();
    })
);


module.exports = createContext;