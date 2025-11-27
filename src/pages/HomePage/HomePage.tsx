import { CoinsTable } from "./components";
import type { CryptoAsset } from "./types";
import HomePageTabs from "./components/HomePageTabs";
import Stack from "../../components/Stack";
import { marketData } from "../../mocks/marketData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const HomePage = () => {
    const [queryUrl, setQueryUrl] = useState<string>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h%2C24h%2C7d&sparkline=true&precision=18');
    
    // const options = {
    //     method: 'GET',
    //     headers: {
                // stored in .env.local file
    //         "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY || '',
    //     }
    // };

    const { data: coins }  = useQuery({
        queryKey: [`coins-${queryUrl}`],
        queryFn: async () => {
            console.log("Using mock market data");
            return JSON.parse(marketData) as CryptoAsset[];
            // console.log("Fetching coins...");
            // const response = await fetch(queryUrl, options);
            // console.log("Response received:", response);
            // if (!response.ok) {
            //     return []
            // }
            // return response.json();
        },
        initialData: JSON.parse(marketData) as CryptoAsset[],
        placeholderData: JSON.parse(marketData) as CryptoAsset[],
        // staleTime: 5 * 60 * 1000,
        // refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })

    return (
        <Stack direction="column" gap="16px">
            <HomePageTabs onTabChange={setQueryUrl} />
            <CoinsTable coins={coins} />
        </Stack>
    );
}
 
export default HomePage;