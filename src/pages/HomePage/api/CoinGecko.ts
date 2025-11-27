/**
 * Class used as a one-time-use builder for CoinGecko API URLs. Designed to make URLS more readable
 * @link https://docs.coingecko.com/v3.0.1/reference/coins-markets
 */
export class CoinGeckoCoinListWithMarketDataURLBuilder {

    // Required
    private readonly baseURL = "https://api.coingecko.com/api/v3/markets";
    private vsCurrency: string | undefined = 'usd';

    public setVsCurrency(vsCurrency: VsCurrency) {
        this.vsCurrency = vsCurrency;
    }

    // Optional
    private category: string | undefined = undefined; // comes from different endpoint and cant be hardcoded https://api.coingecko.com/api/v3/coins/categories/list
    private priceChangePercentages: PriceChangePercentages[] | undefined = undefined;
    private sparkLine: boolean | undefined = undefined;
    private precision: number | undefined = undefined;
    private order: CoinGeckoOrder | undefined = undefined;
    private page: number | undefined = undefined;
    private perPage: number | undefined = undefined;

    public setCategory(category: string) {
        this.category = category
    }

    public setPriceChangePercentages(percentages: PriceChangePercentages[]) {
        this.priceChangePercentages = percentages;
    }

    public setSparkLine(sparkLine: boolean) {
        this.sparkLine = sparkLine;
    }

    public setPrecision(precision: number) {
        let validatedPrecision = precision;
        if (precision < 0) {
            console.warn("Precision cannot be negative. Setting to 0.");
            validatedPrecision = 0;
        }
        if (precision > 18) {
            console.warn("Precision cannot be greater than 18. Setting to 18.");
            validatedPrecision = 18;
        }
        this.precision = validatedPrecision;
    }

    public setOrder(order: CoinGeckoOrder) {
        this.order = order
    }

    public setPage(page: number) {
        this.page = page;
    }

    public setPerPage(perPage: number) {
        this.perPage = perPage;
    }

    private checkRequiredParams() {
        if (!this.vsCurrency) { throw new Error("vs_currency not set"); }
    }

    public build(): string {
        this.checkRequiredParams();
        // %2C is url encoded comma
        const url = `
            ${this.baseURL}?
                vs_currency=${this.vsCurrency}
                ${this.category ? `&category=${this.category}` : ''}
                ${this.priceChangePercentages ? `&price_change_percentage=${this.priceChangePercentages.join('%2C')}` : ''}
                ${this.sparkLine ? `&sparkline=${this.sparkLine}` : ''}
                ${this.precision ? `&precision=${this.precision}` : ''}
                ${this.order ? `&order=${this.order}` : ''}
                ${this.page ? `&page=${this.page}` : ''}
                ${this.perPage ? `&per_page=${this.perPage}` : ''}
        `;
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