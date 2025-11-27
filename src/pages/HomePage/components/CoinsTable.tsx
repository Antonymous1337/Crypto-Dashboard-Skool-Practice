import type { CryptoAsset } from '../types';
import Table, { type TableColumn } from '../../../components/Table';

// import { useQuery } from "@tanstack/react-query";

interface CoinsTableProps {
    coins: CryptoAsset[];
}

export const CoinsTable = ({ coins }: CoinsTableProps) => {

    const desiredColumns = [
        {
            label: 'ID',
            rendererParams: ['id'],
            renderer: ({ id }) => <span>{id}</span>,
        },
        {
            label: 'Symbol',
            rendererParams: ['symbol'],
            renderer: ({ symbol }) => <span>{symbol.toUpperCase()}</span>,
        },
        {
            label: 'Name',
            rendererParams: ['name'],
            renderer: ({ name }) => <span>{name}</span>,
        },
        {
            label: 'Image',
            rendererParams: ['image'],
            renderer: ({ image }) => <img src={image} alt="coin image" width={24} height={24} />,
        },
        {
            label: 'Current',
            rendererParams: ['current_price'],
            renderer: ({ current_price }) => <span>${parseFloat(current_price).toFixed(2)}</span>,
        },
        {
            label: '1h',
            rendererParams: ['price_change_percentage_1h_in_currency'],
            renderer: ({ price_change_percentage_1h_in_currency }) => {
                const value = parseFloat(price_change_percentage_1h_in_currency);
                const formatted = isNaN(value) ? 'N/A' : `${value.toFixed(2)}%`;
                return <span>{formatted}</span>;
            },
        },
        {
            label: '24h',
            rendererParams: ['price_change_percentage_24h_in_currency'],
            renderer: ({ price_change_percentage_24h_in_currency }) => {
                const value = parseFloat(price_change_percentage_24h_in_currency);
                const formatted = isNaN(value) ? 'N/A' : `${value.toFixed(2)}%`;
                return <span>{formatted}</span>;
            },
        },
        {
            label: '7d',
            rendererParams: ['price_change_percentage_7d_in_currency'],
            renderer: ({ price_change_percentage_7d_in_currency }) => {
                const value = parseFloat(price_change_percentage_7d_in_currency);
                const formatted = isNaN(value) ? 'N/A' : `${value.toFixed(2)}%`;
                return <span>{formatted}</span>;
            }
        },
        {
            label: 'Market Cap',
            rendererParams: ['market_cap'],
            renderer: ({ market_cap }) => {
                const value = parseFloat(market_cap);
                const formatted = isNaN(value) ? 'N/A' : `$${value.toLocaleString()}`;
                return <span>{formatted}</span>;
            }
        },
        {
            label: 'Rank',
            rendererParams: ['market_cap_rank'],
            renderer: ({ market_cap_rank }) => <span>{market_cap_rank}</span>,
        }
    ] satisfies TableColumn[];
    

    return (
        <Table<CryptoAsset> 
            columns={desiredColumns}
            data={coins}
        />
    );
}