export const SortedState = {
    NONE: 'none',
    ASC: 'asc',
    DESC: 'desc'
} as const;

export type SortedState = typeof SortedState[keyof typeof SortedState];

export const getSortedState = (sortValue: string | undefined, ascValue: string, descValue: string): SortedState => {
    if (!sortValue) return SortedState.NONE;
    if (sortValue === ascValue) return SortedState.ASC;
    if (sortValue === descValue)  return SortedState.DESC;
    return SortedState.NONE;
}