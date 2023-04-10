import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './store/Store';
import { storeMock, tickersMock } from './mocks';

describe('App', () => {
  const renderWithStore = (initialState: RootState = storeMock) => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    return {
      store,
      host: render(
        <Provider store={store}>
          <App />
        </Provider>
      ),
    };
  };

  it('Should render', () => {
    const store = { ...storeMock };
    store.stocksInfo.filteredTickers = [tickersMock[0]];
    const { host } = renderWithStore(store);

    expect(host.getByTestId('slider')).toBeInTheDocument();
  });

  it('Should change isFiltering', () => {
    const { host, store } = renderWithStore();

    const filterButton = host.getByText('Filter list');
    fireEvent.click(filterButton);

    expect(store.getState().stocksInfo.isFiltering).toBeTruthy();
  });

  it('Should change isFiltering', () => {
    const { host, store } = renderWithStore();

    const slider = host.getByTestId(`slider`);
    fireEvent.change(slider, { target: { value: 25 } });

    expect(store.getState().stocksInfo.updateInterval).toEqual(25000);
  });

  it('Should update hiddenTickers', () => {
    const { host, store } = renderWithStore();

    const filterButton = host.getByText('Filter list');
    fireEvent.click(filterButton);

    const googleCheckbox = screen.getByTestId('GOOGL-checkbox');
    fireEvent.click(googleCheckbox);

    expect(store.getState().stocksInfo.hiddenTickers).toEqual(['GOOGL']);

    fireEvent.click(googleCheckbox);

    expect(store.getState().stocksInfo.hiddenTickers).toEqual([]);
  });

  it('Should update filteredTickers', () => {
    const { host, store } = renderWithStore();

    const filterButton = host.getByText('Filter list');
    fireEvent.click(filterButton);

    let googleCheckbox = screen.getByTestId('GOOGL-checkbox');
    fireEvent.click(googleCheckbox);

    fireEvent.click(filterButton);

    expect(store.getState().stocksInfo.filteredTickers).toEqual([
      tickersMock[0],
    ]);

    fireEvent.click(filterButton);

    googleCheckbox = screen.getByTestId('GOOGL-checkbox');
    fireEvent.click(googleCheckbox);

    expect(store.getState().stocksInfo.filteredTickers).toEqual(tickersMock);
  });
});
