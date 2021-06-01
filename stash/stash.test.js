const createStash = require("./index");

test('passes', () => {
    expect(true).toBe(true);
});

test('query cannot be added twice', () => {
    const stash = createStash();
    stash.addQuery("query", () => {});

    expect(() => {
        stash.addQuery("query", () => {});
    }).toThrow();
});

test('get a value', async () => {
    const stash = createStash();

    stash.addQuery('query', (stash, id) => id);

    const requestStash = stash.create();
    expect(await requestStash.query(15)).toBe(15);
});

test('call maker only once', async () => {
    const stash = createStash();

    const maker = jest.fn((stash, id) => id);
    stash.addQuery('query', maker);

    const requestStash = stash.create();
    expect(await requestStash.query(15)).toBe(15);
    expect(await requestStash.query(15)).toBe(15);
    expect(maker.mock.calls.length).toBe(1);
});

test('call maker twice for two different values', async () => {
    const stash = createStash();

    const maker = jest.fn((stash, id) => id);
    stash.addQuery('query', async (...args) => maker(...args));

    const requestStash = stash.create();
    expect(await requestStash.query(15)).toBe(15);
    expect(await requestStash.query(15)).toBe(15);
    expect(await requestStash.query(27)).toBe(27);
    expect(await requestStash.query(27)).toBe(27);
    expect(maker.mock.calls.length).toBe(2);
});
