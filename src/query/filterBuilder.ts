import { FormatError } from "./errors.js";
import { Filter, OperatorMap } from "./types.js";

export function buildFilter<T>(operators: OperatorMap<T>, filter: Filter): T | null {
    let object: T | null = null
    for(const [field, entry] of Object.entries(filter)) {
        if(!operators.hasOwnProperty(entry.operator)) {
            throw new FormatError(`Wrong filter "${field}[${entry.operator}]"`)
        }

        const operator = operators[entry.operator];

        object = operator(field, entry, object)
    }

    return object
}
