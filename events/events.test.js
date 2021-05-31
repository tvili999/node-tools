const container = require("js-container");
const events = require("./index");

tester("standalone ", events);
tester("component ", () => container.testContext("event", events.component("event")));

function tester(prefix, createEvents) {
    test(prefix + 'Passes', () => {
        expect(true).toBe(true);
    });

    test(prefix + 'simple event', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        const event_name = "testEvent";

        event.on(event_name, handler);
        event.fire(event_name);

        expect(handler.mock.calls.length).toBe(1);
    });

    test(prefix + 'do not add if exists', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        const event_name = "testEvent";

        event.on(event_name, handler);
        event.on(event_name, handler);
        event.fire(event_name);

        expect(handler.mock.calls.length).toBe(1);
    });

    test(prefix + 'event with parameters', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        const event_name = "testEvent";

        event.on(event_name, handler);
        event.fire(event_name, 1, 2);

        expect(handler.mock.calls.length).toBe(1);
        expect(handler.mock.calls[0][0]).toBe(1);
        expect(handler.mock.calls[0][1]).toBe(2);
    });

    test(prefix + 'multiple listeners', async () => {
        const event = await Promise.resolve(createEvents());
        const event_name = "testEvent";

        const handler1 = jest.fn(args => { });
        const handler2 = jest.fn(args => { });

        event.on(event_name, handler1);
        event.on(event_name, handler2);
        event.fire(event_name);

        expect(handler1.mock.calls.length).toBe(1);
        expect(handler2.mock.calls.length).toBe(1);
    });

    test(prefix + 'listener off', async () => {
        const event = await Promise.resolve(createEvents());
        const event_name = "testEvent";

        const handler = jest.fn(args => { });

        event.on(event_name, handler);
        event.fire(event_name);

        expect(handler.mock.calls.length).toBe(1);

        event.off(event_name, handler);
        event.fire(event_name);
        expect(handler.mock.calls.length).toBe(1);
    });

    test(prefix + 'listener off not to fail if event does not exist', async () => {
        const event = await Promise.resolve(createEvents());
        const event_name = "testEvent";

        const handler = jest.fn(args => { });

        event.off(event_name, handler);
        expect(true).toBe(true);
    });

    test(prefix + 'fire not to fail on non existing events', async () => {
        const event = await Promise.resolve(createEvents());

        const event_name = "testEvent";

        event.fire(event_name);

        expect(true).toBe(true);
    });
};
