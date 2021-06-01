module.exports = (resolver) => {
    let value = null;
    let resolved = false;
    return async () => {
        if(!resolved) {
            resolved = true;
            value = await Promise.resolve(resolver());
        }

        return value;
    }
}