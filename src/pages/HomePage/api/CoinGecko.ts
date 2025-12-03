import { URLBuilder } from "./URLBuilder";

/**
 * Class used as a one-time-use builder for CoinGecko API URLs. Designed to make URLS more readable
 * @link https://docs.coingecko.com/v3.0.1/reference/coins-markets
 */
export class CoinGeckoCoinListWithMarketDataURLBuilder extends URLBuilder {

    // Required
    protected readonly _baseURL: string = "https://api.coingecko.com/api/v3/markets";
    private _vsCurrency: string | undefined = 'usd';

    public vsCurrency(vsCurrency: VsCurrency) {
        this._vsCurrency = vsCurrency;
        return this
    }

    // Optional
    private _category: string | undefined = undefined; // comes from different endpoint and cant be hardcoded https://api.coingecko.com/api/v3/coins/categories/list
    private _priceChangePercentages: PriceChangePercentages[] | undefined = undefined;
    private _sparkLine: boolean | undefined = undefined;
    private _precision: number | undefined = undefined;
    private _order: CoinGeckoOrder | undefined = undefined;
    private _page: number | undefined = undefined;
    private _perPage: number | undefined = undefined;

    public category(category: string) {
        this._category = category
        return this
    }

    public priceChangePercentages(percentages: PriceChangePercentages[]) {
        this._priceChangePercentages = percentages;
        return this
    }

    public sparkLine(sparkLine: boolean) {
        this._sparkLine = sparkLine;
        return this
    }

    public precision(precision: number) {
        let validatedPrecision = precision;
        if (precision < 0) {
            console.warn("Precision cannot be negative. Setting to 0.");
            validatedPrecision = 0;
        }
        if (precision > 18) {
            console.warn("Precision cannot be greater than 18. Setting to 18.");
            validatedPrecision = 18;
        }
        this._precision = validatedPrecision;
        return this
    }

    public order(order: CoinGeckoOrder): CoinGeckoCoinListWithMarketDataURLBuilder {
        this._order = order
        return this
    }

    public page(page: number) {
        this._page = page;
        return this
    }

    public perPage(perPage: number) {
        this._perPage = perPage;
        return this
    }

    

    private checkRequiredParams() {
        if (!this._vsCurrency) { throw new Error("vs_currency not set"); }
    }

    public build(): string {
        this.checkRequiredParams();
        // %2C is url encoded comma
        const url = `${this._baseURL}?` +
                `vs_currency=${this._vsCurrency}` +
                `${this._category ? `&category=${this._category}` : ''}` +
                `${this._priceChangePercentages ? `&price_change_percentage=${this._priceChangePercentages.join('%2C')}` : ''}` +
                `${this._sparkLine ? `&sparkline=${this._sparkLine}` : ''}` +
                `${this._precision ? `&precision=${this._precision}` : ''}` +
                `${this._order ? `&order=${this._order}` : ''}` +
                `${this._page ? `&page=${this._page}` : ''}` +
                `${this._perPage ? `&per_page=${this._perPage}` : ''}`;
        return url
    }
}

// Technically supposed to come from the following CoinGecko Endpoint
// https://api.coingecko.com/api/v3/simple/supported_vs_currencies
export const VsCurrency = {
    BTC: "btc",
    ETH: "eth",
    LTC: "ltc",
    CDH: "bch",
    BNB: "bnb",
    EOS: "eos",
    XRP: "xrp",
    XLM: "xlm",
    LINK: "link",
    DOT: "dot",
    YFI: "yfi",
    USD: "usd",
    AED: "aed",
    ARS: "ars",
    AUD: "aud",
    BDT: "bdt",
    BHD: "bhd",
    BMD: "bmd",
    BRL: "brl",
    CAD: "cad",
    CHF: "chf",
    CLP: "clp",
    CNY: "cny",
    CZK: "czk",
    DKK: "dkk",
    EUR: "eur",
    GBP: "gbp",
    GEL: "gel",
    HKD: "hkd",
    HUF: "huf",
    IDR: "idr",
    ILS: "ils",
    INR: "inr",
    JPY: "jpy",
    KRW: "krw",
    KWD: "kwd",
    LKR: "lkr",
    MMK: "mmk",
    MXN: "mxn",
    MYR: "myr",
    NGN: "ngn",
    NOK: "nok",
    NZD: "nzd",
    PHP: "php",
    PKR: "pkr",
    PLN: "pln",
    RUB: "rub",
    SAR: "sar",
    SEK: "sek",
    SGD: "sgd",
    THB: "thb",
    TRY: "try",
    TWD: "twd",
    UAH: "uah",
    VEF: "vef",
    VND: "vnd",
    ZAR: "zar",
    XDR: "xdr",
    XAG: "xag",
    XAU: "xau",
    BITS: "bits",
    SATS: "sats"
}

export type VsCurrency = typeof VsCurrency[keyof typeof VsCurrency];

export const CoinGeckoOrder = {
    MARKET_CAP_DESC: "market_cap_desc",
    MARKET_CAP_ASC: "market_cap_asc",
    VOLUME_DESC: "volume_desc",
    VOLUME_ASC: "volume_asc",
    ID_DESC: "id_desc",
    ID_ASC: "id_asc",
} as const;

export type CoinGeckoOrder = typeof CoinGeckoOrder[keyof typeof CoinGeckoOrder];

export type PriceChangePercentages = '1h' | '24h' | '7d' | '14d' | '30d' | '200d' | '1y';