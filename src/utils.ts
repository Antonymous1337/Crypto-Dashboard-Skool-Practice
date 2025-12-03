import type { StringData } from "./pages/HomePage/types/Data"

export const destructureURLEndpoint = (url: string): { baseURL: string, options: StringData} => {
    if (!url.includes('?')) return { baseURL: url, options: {}}
    const endOfBaseURLIndex = url.indexOf('?')
    const baseURL = url.slice(0, endOfBaseURLIndex)
    const optionsString = url.slice(endOfBaseURLIndex+1, url.length)
    const optionsArray = optionsString.split('&')
    const options = Object.fromEntries(optionsArray.map(option => {
        const [key, valStr] = option.split('=')
        const valArr = valStr.split('%2C')
        return [key, valArr]
    }))
    return { baseURL, options }
}

type GetFromStringDataOrDefaultParams = {
    keys: string[],
    index?: number, 
    options: StringData,
}

/**
 * 
 * @returns undefined if key doesn't exist or doesn't have at least 1 element associated with options array, else returns string[] of values
 */
export const getFromStringData = ({ keys, options }: GetFromStringDataOrDefaultParams): (string[] | undefined)[] => {
    return keys.map(key => {
        const valueArr = options[key]
        if (valueArr === undefined || valueArr.length === 0) return undefined
        return valueArr
    })
}

export const parseIntOrDefault = (str: string | undefined, onFail: number) => {
    if (typeof str !== 'string' || str.trim() === '') return onFail
    const parsedStr = parseInt(str)
    if (!isFinite(parsedStr)) return onFail
    return parsedStr
}

export const parseFloatOrDefault = (str: string | undefined, onFail: number) => {
    if (typeof str !== 'string' || str.trim() === '') return onFail
    const parsedStr = parseFloat(str)
    if (!isFinite(parsedStr)) return onFail
    return parsedStr
}

export const toFixedLocaleString = (num: number, precision: number, style?: keyof Intl.NumberFormatOptionsStyleRegistry , currency: string = 'USD') => {
    return num.toLocaleString(navigator.language, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
        style: style,
        currency: style === 'currency' ? currency : undefined
    })
}

export const getPriceColor = (priceDifferencial: number) => {
    if      (priceDifferencial > 0) return 'green'
    else if (priceDifferencial < 0) return 'red'
    return 'blue'
}