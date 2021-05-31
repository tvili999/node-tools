# Config loader

A simple config file loader module for js-container.

## Usage

```js
module.exports = container => (container
    .configure(require("node-tools/configLoader").fromFile("configComponent", "config.json"))
    .run(async ({get}) => {
        const config = await get("configComponent");
    });
)
```

