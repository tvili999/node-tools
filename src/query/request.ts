import { Query, QueryConfig, Sort, SortOrder, Filter } from "./types.js"
import { FormatError } from "./errors.js"

type QueryParams = {[key: string]: unknown}

function parsePage(query: QueryParams):(number|null) {
    if(typeof query.page !== "string") {
        return null
    }

    const page = parseInt(query.page)
    if(Number.isNaN(page)) {
        throw new FormatError(`Bad query parameter "page"`)
    }

    if(page <= 0) {
        throw new FormatError(`Bad query parameter "page"`)
    }
    return page
}

function parseSize(query: QueryParams, config?: QueryConfig): (number|null) {
    if(typeof query.size !== "string") {
        return config?.defaultSize || null;
    }

    const maxSize = config?.maxSize || 100

    const size = parseInt(query.size)
    if(Number.isNaN(size)) {
        throw new FormatError(`Bad query parameter "size"`)
    }

    if(size > maxSize) {
        return maxSize
    }
    return size
}

function parseSort(query: QueryParams, config?: QueryConfig) : Sort[] | null {
    if(typeof query.sort !== "string") {
        return config?.defaultSort || null
    }

    const result: Sort[] = []
    const fields = query.sort.split(':')
    if(fields.length == 0)
        throw new FormatError(`Bad query parameter "sort"`)

    for(let field of fields) {
        let order: SortOrder = "asc"

        if(field.startsWith(">")) {
            order = "desc"
            field = field.substring(1)
        }
        if(field.startsWith("<")) {
            field = field.substring(1)
        }

        result.push({ field, order })
    }

    return result
}

function parseFilters(query: QueryParams): Filter | null {
    const result: Filter = {};

    for(const [key, operators] of Object.entries(query)) {
        if(!key.startsWith("f:")) {
            continue
        }
        const field = key.substring(2)

        if(typeof operators !== "object") {
            throw new FormatError(`Bad query parameter "${key}"`)
        }

        const operatorEntries = Object.entries(operators as object)
        if(operatorEntries.length != 1) {
            throw new FormatError(`Bad query parameter "${key}"`)
        }

        const [operator, value] = operatorEntries[0]
        if(typeof value !== "string") {
            throw new FormatError(`Bad query parameter "${key}[${operator}]"`)
        }

        result[field] = { operator, value }
    }

    return result
}

export default function queryFromRequestQuery(query: QueryParams, config?: QueryConfig): Query {
    return {
        page: parsePage(query) || 1,
        size: parseSize(query, config) || 10,
        sort: parseSort(query, config) || [],
        filter: parseFilters(query) || {}
    }
}
