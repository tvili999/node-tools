# express ws

This is a module for the js-container that enables webserver.

## Usage

### Inject

The following code will inject the server to container with the name `server`.

```js
module.exports = container => (container
    .configure(require("node-tools/expressWs")("server"))
)
```

### Stages

The server has 4 different stages to do things on the express app. Their order is the following:
- config
- static
- route
- fallback

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

### Config

On the initial setup, you can config the server as following:

```js
module.exports = container => (container
    .configure(require("node-tools/expressWs")("server", server => {
        server.listen(8080);
        server.enableWs();
        server.config(app => {
            app.use(someMiddleware);
        });
    }))
)
```

### Websockets

Websockets can be enabled by calling `server.enableWs();`.
