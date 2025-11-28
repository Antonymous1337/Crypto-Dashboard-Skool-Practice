import { CoinGeckoCoinListWithMarketDataURLBuilder } from "../api/CoinGecko";
import { HomePageTab } from "../types";
import Tabs from "../../../components/Tabs";

interface HomePageTabsProps {
    onTabChange: (url: string) => void;
}

const HomePageTabs = ({ onTabChange }: HomePageTabsProps) => {

    const tabs = HomePageTab
    const _onTabChange = (tab: string) => {
        switch (tab) {
            case HomePageTab.All:
                onTabChange(
                    new CoinGeckoCoinListWithMarketDataURLBuilder()
                        .vsCurrency('usd')
                        .priceChangePercentages(['1h', '24h', '7d'])
                        .sparkLine(true)
                        .precision(18)
                        .build()
                )
                break;
            case HomePageTab.Gainers:
                //onTabChange('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc');
                break;
            case HomePageTab.Losers:
                //onTabChange('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc');
                break;
        }
    }

    return (
        <Tabs 
            tabs={Object.values(tabs)}
            onTabChange={_onTabChange}
        />
    );
}
 
export default HomePageTabs;