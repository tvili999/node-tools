# Context

Context is a middleware for express that enables lightweight contexts to be created lazily on request object.

## Usage

```js
const createContext = require("node-tools/context");

// Setting up context
const context = createContext();
app.use(context);

// Setting up context builder
context.add("testContext", (req) => {
    let _value = 0;
    return {
        set: (value) => _value = value,
        get: () => _value
    }
});

app.get("/", (req, res) => {
    // req.context.testContext gets builded here
    req.context.testContext.set(25);

    // req.context.testContext already exists here, as well the value is 25
    res.send(req.context.testContext.get()); 
});
```

### Practical example

```js
const createContext = require("node-tools/context");
const resolveOnce = require("node-tools/resolveOnce");

const context = createContext();
app.use(context);

context.add("getMe", (req) => resolveOnce(() => 
    db.queryUser(req.cookies.username)
));

context.add("getMyCart", (req) => resolveOnce(async () => 
    db.queryCartByUserID((await req.context.getMe()).id)
));

app.get("/", (req, res) => {
    const me = await req.context.getMe(); // Me gets queried from DB here


    res.send(await req.context.getCart()); // Cart gets queried from DB here, but me is already queried
});

app.get("/cart-only", (req, res) => {
    res.send(await req.context.getCart()); // Me and cart gets queried from DB here
});
```
