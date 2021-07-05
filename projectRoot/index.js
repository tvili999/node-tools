const fs = require("fs");
const path = require("path");

module.exports = (currentFile) => {
    const dirname = path.dirname(currentFile);
    let currentPath = dirname;

    while(!fs.existsSync(path.resolve(currentPath, "package.json"))) {
        const parentDir = path.resolve(currentPath, "..");
        if(currentPath === parentDir)
            return (fs.existsSync(path.resolve(currentPath, "package.json"))) ?
                currentPath :
                null;
        currentPath = parentDir;
    }

    return path.relative(dirname, path.join(currentPath, "package.json"));
}
