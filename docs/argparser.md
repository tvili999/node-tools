# ArgParser

A command line command subcommand arg parser.

## Usage

Basic idea behind this, is to have a runner function, that accepts an args parameter that contains all the arguments the program has in its current state.
This state can then be processed further.

### Argparser function

```js
// index.js
const argparser = require("node-tools/argparser");

const parser = argparser(args => {
    console.log(args);
});
```

```bash
node index.js arg1 arg2 # Outputs [arg1, arg2]
```

### Subcommands

With subcommands you can have multiple contexts based on the first argument.
The underscore `_` subcommand is the default case.

```js
// index.js
const argparser = require("node-tools/argparser");

const parser = argparser(argparser.subcmd({
    someaction1: args => {
        console.log("someaction1", args);
    },
    someaction2: argparser.subcmd({
        subaction1: args => {
            console.log("someaction1/subaction1", args);
        },
        _: args => {
            console.log("someaction1/_", args);
        }
    })
}));
```

```bash
node index.js someaction1 arg1 arg2 # Outputs someaction1 [arg1, arg2]
node index.js someaction2 subaction1 arg1 # Outputs someaction1/subaction1 [arg1]
node index.js someaction2 arg1 arg2 # Outputs someaction1/_ [arg2]
```

Notice that _ gets removed and there is no way to determine what exactly it was. 
*TODO: Solve the case when you need this value*

