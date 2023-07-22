const argparse = (parser) => {
    const process = require("process");
    parser(process.argv.slice(2));
};

argparse.subcmd = (commands) => (args) => {
    const [cmd, ...restArgs] = args;

    if(cmd in commands)
        return commands[cmd]?.([...restArgs]);
    if("_" in commands)
        return commands["_"]?.([...restArgs]);
};

module.exports = argparse;