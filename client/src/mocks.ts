import { IStocksInfo } from '../types';

export const tickersMock: IStocksInfo[] = [
  {
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 279.29,
    change: -64.52,
    change_percent: 0.84,
    dividend: 0.56,
    last_trade_time: '2021-04-30T11:53:21.000Z',
  },
  {
    ticker: 'GOOGL',
    exchange: 'NASDAQ',
    price: 237.08,
    change: 154.38,
    change_percent: -0.86,
    dividend: 0.44,
    last_trade_time: '2021-04-30T11:53:21.000Z',
  },
];
