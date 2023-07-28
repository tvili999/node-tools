export type Operator<T> = (field: string, filter: FilterEntry, obj: T | null) => T

export interface OperatorMap<T> {
    [operator: string]: Operator<T>
}

export interface FilterEntry {
    operator: string,
    value: string
}

export interface Filter {
    [field: string]: FilterEntry
}

export type SortOrder = "asc" | "desc"

export interface Sort {
    field: string,
    order: SortOrder
}

export interface QueryConfig {
    defaultSize?: number,
    maxSize?: number,
    defaultSort?: Sort[]
}

export interface Query {
    filter: Filter,
    page: number,
    size: number,
    sort: Sort[]
}
