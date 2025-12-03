export const SortValue = {
    MARKET_CAP_DESC: 'market_cap_desc',
    MARKET_CAP_ASC: 'market_cap_asc',
    VOLUME_DESC: 'volume_desc',
    VOLUME_ASC: 'volume_asc',
    ID_DESC: 'id_desc',
    ID_ASC: 'id_asc',
} as const

export type SortValue = typeof SortValue[keyof typeof SortValue];