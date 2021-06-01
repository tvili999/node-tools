# Server

This is a module for the js-container that makes applications that need to be configured in a specified order easier to integrate into js container.

## Usage

### Inject

The following code will inject an express server to container with the name `server`.

```js
module.exports = container => (container
    .configure(require("node-tools/multistage")("server", {
        init: () => express(),
        run: (app) => app.listen(8080),
        stages: ["config", "static", "route", "fallback"]
    }))
)
```

### Stages

These run in unknown order inside the stages, but the stages are applied in order.

You can attach code to stages like this:

```js
module.exports = container => container.run(async ({get}) => {
    const server = await get("server");

    server.config(app => {
        app.use(sampleMiddleware());
    });

    server.static(app => {
        app.use(express.static('public'));
    });

    server.route(app => {
        app.get("/", (req, res) => {
            res.send("Hello World");
        })
    })
})
```
