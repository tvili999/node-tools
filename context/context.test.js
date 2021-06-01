const createContext = require("./index");

test('passes', () => {
    expect(true).toBe(true);
});

test('middleware calls next', () => {
    const context = createContext();

    const nextMethod = jest.fn(() => {});

    context({}, {}, nextMethod);

    expect(nextMethod.mock.calls.length).toBe(1);
})
test('middleware sets context object', () => {
    const context = createContext();

    const req = {};
    context(req, {}, () => {});

    expect(req.context).toBeTruthy();
});

test('middleware fail on double assign', () => {
    const context = createContext();

    const req = {};
    context(req, {}, () => {});

    expect(() => {
        context(req, {}, () => {});
    }).toThrow();
});

test('context builder runs', () => {
    const context = createContext();

    const builder = jest.fn(() => {});
    context.add("context", builder);

    const req = {};
    context(req, {}, () => {});

    req.context.context;
    expect(builder.mock.calls.length).toBe(1);
});

test('context builder runs once', () => {
    const context = createContext();

    const builder = jest.fn(() => {});
    context.add("context", builder);

    const req = {};
    context(req, {}, () => {});

    req.context.context;
    req.context.context;
    expect(builder.mock.calls.length).toBe(1);
});

test('context values get created', () => {
    const context = createContext();

    const builder = jest.fn(() => 24);
    context.add("context", builder);

    const req = {};
    context(req, {}, () => {});

    expect(req.context.context).toBe(24);
});

test('falsy context values get created', () => {
    const context = createContext();

    const builder = jest.fn(() => false);
    context.add("context", builder);

    const req = {};
    context(req, {}, () => {});

    expect(req.context.context === false).toBeTruthy();
});
