import Clickable from "./Clickable";
import type { Data } from "../pages/HomePage/types/Data";
import { useState, type JSX } from "react";
import { SortedState } from "../pages/HomePage/types/SortedState";

interface TableProps<T extends Data> {
    columns: TableColumn[];
    data: T[];
}

/**
 * @example refer to CoinsTable.tsx for usage example 
 */
const Table = <T extends Data,>({ columns, data }: TableProps<T>) => {

    const parsedHeaders = columns.map((col, i) => {

        return (
            <ColumnHeader key={`col-header-${i}`} col={col} />
        )
    })

    const parsedData = data.map((row, rowi) => (
        <tr key={`row-${rowi}`}>
            {columns.map((col, coli) => {
                const zippedParams: Record<string, string> = Object.fromEntries(
                    col.rendererParams.map((param) => {
                        if (param === 'index') { return [param, `${rowi}`]}
                        if (!(param in row)) { return [param, '']; }
                        else return [param, JSON.stringify(row[param]) || ''];
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
                <tr>
                    {parsedHeaders}
                </tr>
            </thead>
            <tbody>
                {parsedData}
            </tbody>
        </table>
    );
}

const ColumnHeader = ({ col }: { col: TableColumn }) => {
    const [hover, setHover] = useState<boolean>(false);

    const arrowString = (() => {
        if (hover) {
            if (col.sortedState === SortedState.ASC) return ' ▼'
            if (col.sortedState === SortedState.DESC) return ' ▲'
            return ' ▼'
        }
        if (col.sortedState === SortedState.ASC) return ' ▲'
        if (col.sortedState === SortedState.DESC) return ' ▼'
        return ''
    })()

    const textWrapper = col.onSort 
        ? <Clickable onClick={col.onSort}>
            <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {col.label}
                {arrowString}
            </span>
            </Clickable>
        : <>{col.label}</>

    return (
        <th>{textWrapper}</th>
    )
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
    onSort?: () => void;
    sortedState?: SortedState
}

export default Table;