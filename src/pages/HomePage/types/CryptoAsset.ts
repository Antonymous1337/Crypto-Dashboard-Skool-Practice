import type { Data } from "./Data";

export interface CryptoAsset extends Data {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;        // ISO 8601 date-time string, or null if unavailable
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;        // ISO 8601 date-time string, or null if unavailable
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;           // ISO 8601 date-time string

  /** Added fields below */

  // if sparkline data = true and available
  sparkline_in_7d?: SparklineData

  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;

}

export type SparklineData = {
  price: number[];
  } | null
