export default class Event {
    private eventHandlers: Set<Function> = new Set()

    on(handler: Function) {
        this.eventHandlers.add(handler)
    }

    once(handler: Function) {
        const wrapperHandler = (...args: unknown[]) => {
            handler(...args);
            this.off(wrapperHandler);
        }
        this.on(wrapperHandler);
    }

    off(handler: Function) {
        this.eventHandlers.delete(handler)
    }

    fire(...args: unknown[]) {
        for(const handler of this.eventHandlers)
            handler(...args);
    }
}
