# Stash

Stash is a context for ie. database queries that can be queried, updated etc.
Main goal for this module is to query the database only when needed.

## Usage

```js
const stash = require("node-tools/stash");
const createContext = require("node-tools/context");

const context = createContext();
app.use(context);

const stash = createStash();
context.add("stash", () => stash.create());

stash.addQuerier("productById", async (stash, id) => {
    return await db.getProduct({ id });
});

app.get("/", async (req, res) => {
    const product1 = await req.context.stash.productById(1); // returns or gets from cache
    const product2 = await req.context.stash.productByAAndB(1, 2); // returns or gets from cache

});

```
