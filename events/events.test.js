const container = require("js-container");
const events = require("./index");

test('Passes', () => {
    expect(true).toBe(true);
});

tester("standalone ", events);
tester("component ", () => container.testContext("event", events.component("event")));

function tester(prefix, createEvents) {
    test(prefix + 'simple event', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        event.on("event", handler);
        event.fire("event");

        expect(handler.mock.calls.length).toBe(1);
    });

    test(prefix + 'do not add if exists', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        event.on("event", handler);
        event.on("event", handler);
        event.fire("event");

        expect(handler.mock.calls.length).toBe(1);
    });

    test(prefix + 'event with parameters', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        event.on("event", handler);
        event.fire("event", 1, 2);

        expect(handler.mock.calls.length).toBe(1);
        expect(handler.mock.calls[0][0]).toBe(1);
        expect(handler.mock.calls[0][1]).toBe(2);
    });

    test(prefix + 'multiple listeners', async () => {
        const event = await Promise.resolve(createEvents());

        const handler1 = jest.fn(args => { });
        const handler2 = jest.fn(args => { });

        event.on("event", handler1);
        event.on("event", handler2);
        event.fire("event");

        expect(handler1.mock.calls.length).toBe(1);
        expect(handler2.mock.calls.length).toBe(1);
    });

    test(prefix + 'listener off', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        event.on("event", handler);
        event.fire("event");

        expect(handler.mock.calls.length).toBe(1);

        event.off("event", handler);
        event.fire("event");
        expect(handler.mock.calls.length).toBe(1);
    });

    test(prefix + 'listener off not to fail if event does not exist', async () => {
        const event = await Promise.resolve(createEvents());

        const handler = jest.fn(args => { });

        event.off("event", handler);
        expect(true).toBe(true);
    });

    test(prefix + 'fire not to fail on non existing events', async () => {
        const event = await Promise.resolve(createEvents());

        event.fire("event");

        expect(true).toBe(true);
    });
};
