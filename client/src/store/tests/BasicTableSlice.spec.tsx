import reducer, {
  setIsFiltering,
  setStocksInfo,
  updateHiddenTicker,
  changeUpdateInterval,
} from '../BasicTableSlice';
import { tickersMock } from '../../mocks';

describe('BasicTableSlice', () => {
  it('should set stocks info', () => {
    expect(reducer(undefined, setStocksInfo(tickersMock))).toEqual(
      expect.objectContaining({
        tickers: tickersMock,
        filteredTickers: tickersMock,
      })
    );
  });

  it('should set isFiltering value', () => {
    expect(reducer(undefined, setIsFiltering(true))).toEqual(
      expect.objectContaining({
        isFiltering: true,
      })
    );
  });

  it('should set hidden tickers', () => {
    expect(
      reducer(undefined, updateHiddenTicker({ ticker: 'AAPL', isHidden: true }))
    ).toEqual(
      expect.objectContaining({
        hiddenTickers: ['AAPL'],
      })
    );
  });

  it('should set update interval', () => {
    expect(reducer(undefined, changeUpdateInterval(10000))).toEqual(
      expect.objectContaining({
        updateInterval: 10000,
      })
    );
  });
});
