const fs = require("fs");
const path = require("path");

module.exports = (currentFile) => {
    let currentPath = path.dirname(currentFile);

    while(!fs.existsSync(path.resolve(currentPath, "package.json"))) {
        const parentDir = path.resolve(currentPath, "..");
        if(currentPath === parentDir)
            return (fs.existsSync(path.resolve(currentPath, "package.json"))) ?
                currentPath :
                null;
        currentPath = parentDir;
    }

    return currentPath;
}
