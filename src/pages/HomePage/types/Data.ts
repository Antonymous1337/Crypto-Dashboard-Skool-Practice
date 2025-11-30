/**
 * A way to to ensure keys are strings, and values can be of various known types.
 */
export interface Data {
    [key: string]: string | string[] | number | number[] | boolean | boolean[] | null | Data | Data[] | undefined;
}

export interface StringData {
    [key: string]: string[] // intentionally an array to handle multi values
}