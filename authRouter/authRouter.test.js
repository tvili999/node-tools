const createAuthRouter = require("./index");

test('passes', () => {
    expect(true).toBe(true);
});

test('calls handler, does not call next', async () => {
    const authRouter = createAuthRouter({
        auth: async () => true
    });

    const handler = jest.fn(() => {});
    const next = jest.fn(() => {});

    await authRouter.auth(handler)({}, {}, next);

    expect(handler.mock.calls.length).toBe(1);
    expect(next.mock.calls.length).toBe(0);
});

test('calls next, does not call handler', async () => {
    const authRouter = createAuthRouter({
        auth: async () => false
    });

    const handler = jest.fn(() => {});
    const next = jest.fn(() => {});

    await authRouter.auth(handler)({}, {}, next);

    expect(handler.mock.calls.length).toBe(0);
    expect(next.mock.calls.length).toBe(1);
});
