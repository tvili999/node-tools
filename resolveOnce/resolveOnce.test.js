const resolveOnce = require("./index");

test('passes', () => {
    expect(true).toBe(true);
});

test('resolves', async () => {
    const cache = resolveOnce(() => 25);
    expect(await cache()).toBe(25);
    expect(await cache()).toBe(25);
});

test('resolves async', async () => {
    const cache = resolveOnce(async () => 25);
    expect(await cache()).toBe(25);
    expect(await cache()).toBe(25);
});

test('resolves once', async () => {
    const resolver = jest.fn(() => 25);
    const cache = resolveOnce(resolver);
    await cache();
    await cache();
    expect(resolver.mock.calls.length).toBe(1);
});

test('does not resolve when not needed', async () => {
    const resolver = jest.fn(() => 25);
    const cache = resolveOnce(resolver);
    expect(resolver.mock.calls.length).toBe(0);
});
