# Context

This is a context object implementation. You can add items to this context, and get them later.

This way you can pass around the context in your application. It was created for request scoped objects. You can pass this context around instead of individual request scoped objects like db connection or authentication data.

## Usage

First you need a context factory:

```ts
import { ContextFactory } from "@tvili999/node-tools/context";

const contextFactory = new ContextFactory();
```

Then you can add builders to this factory:

```ts
contextFactory.addBuilder("me", async (req, res) => {
    const userId = decodeToken(req.headers['authorization'])

    return await db.get(userId)
})
```

And now you can use it in your request, and pass it around:

```ts
app.get("/api/me", async (req, res) => {
    const context = await contextFactory.build(req, res);

    const me = await context.get("me") as User;
})
```


## EntryKey

If you use typescript, you can avoid casting by using `EntryKey`s:

```ts
import { EntryKey } from "@tvili999/node-tools/context";

const meKey: EntryKey<User> = Symbol("me");

contextFactory.addBuilder(meKey, async (req, res) => {
    const userId = decodeToken(req.headers['authorization'])

    return await db.get(userId) // It is enforced to return User
})

app.get("/api/me", async (req, res) => {
    const context = await contextFactory.build(req, res);

    const me = await context.get(meKey)
    // me will be type of User, as it is infered from `meKey`
})
```
