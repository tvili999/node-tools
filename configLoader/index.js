const fs = require("fs");
const process = require("process");

module.exports = {
    fromFile: (componentName, file) => ({ inject }) => inject(componentName, () => {
        if(!fs.existsSync(file)) {
            console.error("No config file exists");
            process.exit(1);
        }
        const config = fs.readFileSync(file);

        try {
            return JSON.parse(config);
        }
        catch {
            console.error("Wrong config file format");
            process.exit(1);
        }
    })
}

