export interface IStocksInfo {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  last_trade_time: string;
}
