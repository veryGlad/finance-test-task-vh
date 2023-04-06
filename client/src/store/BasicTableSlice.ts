import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStocksInfo } from '../../types';

interface IStocksInfoState {
  tickers: IStocksInfo[];
  filteredTickers: IStocksInfo[];
  isFiltering: boolean;
  hiddenTickers: string[];
  updateInterval: number;
}

const initialState: IStocksInfoState = {
  tickers: [],
  filteredTickers: [],
  isFiltering: false,
  hiddenTickers: [],
  updateInterval: 5000,
};

const stocksInfoSlice = createSlice({
  name: 'stocksInfo',
  initialState,
  reducers: {
    setStocksInfo: (state, action: PayloadAction<IStocksInfo[]>) => {
      state.tickers = action.payload;
      updateFilteredTickers(state);
    },
    setIsFiltering: (state, action: PayloadAction<boolean>) => {
      state.isFiltering = action.payload;
    },
    updateHiddenTicker: (
      state,
      action: PayloadAction<{ ticker: string; isHidden: boolean }>
    ) => {
      const hasCurrentTicker = state.hiddenTickers.includes(
        action.payload.ticker
      );
      if (action.payload.isHidden) {
        !hasCurrentTicker && state.hiddenTickers.push(action.payload.ticker);
      } else {
        if (hasCurrentTicker) {
          state.hiddenTickers = state.hiddenTickers.filter(
            (i) => i !== action.payload.ticker
          );
        }
      }
      updateFilteredTickers(state);
    },
    changeUpdateInterval: (state, action: PayloadAction<number>) => {
      state.updateInterval = action.payload;
    },
  },
});

const updateFilteredTickers = (state: IStocksInfoState) => {
  state.filteredTickers = state.tickers.filter(
    (i) => !state.hiddenTickers.includes(i.ticker)
  );
};

export const {
  setStocksInfo,
  setIsFiltering,
  updateHiddenTicker,
  changeUpdateInterval,
} = stocksInfoSlice.actions;

export default stocksInfoSlice.reducer;
