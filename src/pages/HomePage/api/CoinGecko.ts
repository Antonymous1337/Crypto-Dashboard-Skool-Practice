export enum CoinGeckoEndpoints {
    COINS_MARKETS = '/coins/markets',
    COIN_DETAILS = '/coins/{id}',
    COIN_MARKET_CHART = '/coins/{id}/market_chart',
}

export class CoinGeckoURLBuilder {
    private baseURL: string;
    private endpoint: Record<string, string> = {}

    constructor() {
        this.baseURL = 'https://api.coingecko.com/api/v3';
    }

    buildEndpoint(): string {
        return this.baseURL;
    }

}