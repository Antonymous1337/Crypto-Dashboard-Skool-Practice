import type { CryptoAsset, SparklineData } from '../types';
import Table, { type TableColumn } from '../../../components/Table';
import { destructureURLEndpoint, structureURLEndpoint, getFromStringData, getPriceColor, parseFloatOrDefault, parseIntOrDefault, toFixedLocaleString } from '../../../utils';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { useCallback, useMemo } from 'react';
import { SortValue } from '../types/SortValue';
import { getSortedState } from '../types/SortedState';

// import { useQuery } from "@tanstack/react-query";

interface CoinsTableProps {
    queryUrl: string;
    setQueryUrl: (url: string) => void;
    coins: CryptoAsset[];
}

export const CoinsTable = ({ queryUrl, setQueryUrl, coins }: CoinsTableProps) => {

    const destructuredURL = useMemo(() => destructureURLEndpoint(queryUrl), [queryUrl]);
    const sort = destructuredURL.options['order']?.[0]

    const [pageData, itemsPerPageData] = getFromStringData({
        keys: ['page', 'per_page'],
        options: destructuredURL.options,
    })
    const page = parseIntOrDefault(pageData?.[0], 0)
    const itemsPerPage = parseIntOrDefault(itemsPerPageData?.[0], 100)

    const isSparklineValid = (sparkline: unknown): sparkline is Exclude<SparklineData, null> => {
        if (!sparkline || typeof sparkline !== 'object') return false
        if (!('price' in sparkline)) return false
        const priceArray = sparkline['price']
        if (!priceArray || !Array.isArray(priceArray)) return false
        if (priceArray.length === 0) return true
        if (typeof priceArray[0] !== 'number') return false
        if (!isFinite(priceArray[0])) return false
        return true
    }

    const marketCapSortCallback = useCallback(() => {
        let nextSort: string = SortValue.MARKET_CAP_DESC
        if (sort === SortValue.MARKET_CAP_DESC) { nextSort = SortValue.MARKET_CAP_ASC }
        const newOptions = { ...destructuredURL.options, order: [nextSort] }
        const newURL = structureURLEndpoint(destructuredURL.baseURL, newOptions)
        setQueryUrl(newURL)
    }, [sort, destructuredURL, setQueryUrl]);
    const marketCapSortedState = getSortedState(sort, SortValue.MARKET_CAP_ASC, SortValue.MARKET_CAP_DESC)

    const volumeSortCallback = useCallback(() => {
        let nextSort: string = SortValue.VOLUME_DESC
        if (sort === SortValue.VOLUME_DESC) { nextSort = SortValue.VOLUME_ASC }
        const newOptions = { ...destructuredURL.options, order: [nextSort] }
        const newURL = structureURLEndpoint(destructuredURL.baseURL, newOptions)
        setQueryUrl(newURL)
    }, [sort, destructuredURL, setQueryUrl]);
    const volumeSortedState = getSortedState(sort, SortValue.VOLUME_ASC, SortValue.VOLUME_DESC)

    const desiredColumns = useMemo(() => {
        return [
            {
                label: '#',
                rendererParams: ['index'],
                renderer: ({ index }) => {
                    const adjustedIndex = (parseIntOrDefault(index, 0) + 1) + (page * itemsPerPage)
                    return (
                        <span>{adjustedIndex}</span>
                    )
                },
            },
            {
                label: 'Coin',
                rendererParams: ['image', 'name', 'symbol'],
                renderer: ({ image, name, symbol }) => {
                    const parsedImage = JSON.parse(image)
                    const parsedName = JSON.parse(name)
                    const parsedSymbol = JSON.parse(symbol)
                    return (
                        <span>
                            <img src={parsedImage} alt="coin image" width={24} height={24} />
                            {parsedName}
                            {parsedSymbol.toUpperCase()}
                        </span>
                    )
                }
            },
            {
                label: 'Price',
                rendererParams: ['current_price'],
                renderer: ({ current_price }) => {
                    const value = parseFloat(current_price);
                    const formatted = isNaN(value) ? 'N/A' : `${toFixedLocaleString(value, 2, 'currency')}`;
                    return <span>{formatted}</span>;
                },
            },
            {
                label: '1h',
                rendererParams: ['price_change_percentage_1h_in_currency'],
                renderer: ({ price_change_percentage_1h_in_currency }) => {
                    const value = parseFloat(price_change_percentage_1h_in_currency)/100;
                    const formatted = isNaN(value) ? 'N/A' : `${toFixedLocaleString(value, 2, 'percent')}`;
                    return <span>{formatted}</span>;
                }
            },
            {
                label: '24h',
                rendererParams: ['price_change_percentage_24h_in_currency'],
                renderer: ({ price_change_percentage_24h_in_currency }) => {
                    const value = parseFloat(price_change_percentage_24h_in_currency)/100;
                    const formatted = isNaN(value) ? 'N/A' : `${toFixedLocaleString(value, 2, 'percent')}`;
                    return <span>{formatted}</span>;
                },
            },
            {
                label: '7d',
                rendererParams: ['price_change_percentage_7d_in_currency'],
                renderer: ({ price_change_percentage_7d_in_currency }) => {
                    const value = parseFloat(price_change_percentage_7d_in_currency)/100;
                    const formatted = isNaN(value) ? 'N/A' : `${toFixedLocaleString(value, 2, 'percent')}`;
                    return <span>{formatted}</span>;
                }
            },
            {
                label: 'Market Cap',
                rendererParams: ['market_cap'],
                renderer: ({ market_cap }) => {
                    const value = parseFloat(market_cap);
                    const formatted = isNaN(value) ? 'N/A' : `${toFixedLocaleString(value, 0, 'currency')}`;
                    return <span>{formatted}</span>;
                },
                onSort: marketCapSortCallback,
                sortedState: marketCapSortedState
            },
            {
                label: 'Volume',
                rendererParams: ['total_volume'],
                renderer: ({ total_volume }) => {
                    const value = parseFloat(total_volume);
                    const formatted = isNaN(value) ? 'N/A' : `${toFixedLocaleString(value, 0, 'currency')}`;
                    return <span>{formatted}</span>;
                },
                onSort: volumeSortCallback,
                sortedState: volumeSortedState
            },
            {
                label: 'Last 7 Days',
                rendererParams: ['sparkline_in_7d', 'price_change_percentage_7d_in_currency'],
                renderer: ({ sparkline_in_7d, price_change_percentage_7d_in_currency}) => {
                    const parsedSparklineIn7d = JSON.parse(sparkline_in_7d)
                    const isValidSparkline = isSparklineValid(parsedSparklineIn7d)
                    if (!isValidSparkline) return <></>
                    const paddingData = []
                    // 167 is hours in week -1. Without the -1 some charts looked weird so this prevents that from happening
                    while (paddingData.length < 167-parsedSparklineIn7d.price.length) paddingData.push({ 
                        x: paddingData.length,
                        y: 0
                    })
                    const finalizedData = paddingData.concat(parsedSparklineIn7d.price.map((dataPoint, i) => {
                        return {
                            x: i,
                            y: dataPoint
                        }
                    }))

                    const weekPriceChange = parseFloatOrDefault(price_change_percentage_7d_in_currency, 1);
                    const chartColor = getPriceColor(weekPriceChange)

                    return (
                        <LineChart
                            style={{ width: '100px', maxWidth: '700px', height: '50%', maxHeight: '70vh', aspectRatio: 1.618 }}
                            data={finalizedData}
                            margin={{
                                top: 10,
                                right: 0,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <XAxis dataKey="x" hide/>
                            <YAxis width="auto" hide domain={['dataMin', 'dataMax']} />
                            <Line type="monotone" dataKey="y" stroke={chartColor} dot={false} activeDot={false} />
                        </LineChart>
                    )
                }
            }
        ] satisfies TableColumn[];
    }, [page, itemsPerPage, marketCapSortCallback, marketCapSortedState, volumeSortCallback, volumeSortedState]);
    

    return (
        <Table<CryptoAsset> 
            columns={desiredColumns}
            data={coins}
        />
    );
}