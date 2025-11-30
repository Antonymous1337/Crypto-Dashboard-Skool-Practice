import type { Data } from "../pages/HomePage/types/Data";
import type { JSX } from "react";

interface TableProps<T extends Data> {
    columns: TableColumn[];
    data: T[];
}

/**
 * @example refer to CoinsTable.tsx for usage example 
 */
const Table = <T extends Data,>({ columns, data }: TableProps<T>) => {

    const parsedHeaders = columns.map((col, i) => (
        <th key={`header-${col.label}-${i}`}>{col.label}</th>
    ))

    const parsedData = data.map((row, rowi) => (
        <tr key={`row-${rowi}`}>
            {columns.map((col, coli) => {
                const zippedParams: Record<string, string> = Object.fromEntries(
                    col.rendererParams.map((param) => {
                        if (param === 'index') { return [param, `${rowi}`]}
                        if (!(param in row)) { return [param, '']; }
                        else return [param, row[param]?.toString() || ''];
                    })
                );
                const renderedCell = col.renderer(zippedParams);
                return (
                    <td key={`${row.id}-${rowi}-${coli}`}>{renderedCell}</td>
                )
            })}
        </tr>
    ));

    return (
        <table>
            <thead>
                {parsedHeaders}
            </thead>
            <tbody>
                {parsedData}
            </tbody>
        </table>
    );
}

/**
 * @prop label: for the column header
 * @prop renderParams: the keys to extract from each data row for rendering
 * @prop renderer: a function that takes in the extracted params and returns a JSX.Element
 * 
 * Make sure that the keys in rendererParams exist in the data rows to avoid empty string ('') values. All params are stringified before being passed to the renderer.
 */
export interface TableColumn {
    label: string;
    rendererParams: string[]
    renderer: (params: Record<string, string>) => JSX.Element;
}

export default Table;