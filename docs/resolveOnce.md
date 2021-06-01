# Resolve Once

This module is a little cache helper method. Stores value on first resolve and uses that value.

## Usage

```js
const resolveOnce = require("node-tools/resolveOnce");

const valueGetter = resolveOnce(async () => {
    return await longRunningOperation();
});

const a = await valueGetter(); // long running operation runs here
const b = await valueGetter(); // value gets returned from previous resolve
```
