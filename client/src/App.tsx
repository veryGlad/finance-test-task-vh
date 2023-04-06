import './App.css';
import { Box, Button } from '@mui/material';
import Header from './components/Header';
import BasicTable from './components/BasicTable';
import Typography from '@mui/material/Typography';
import DiscreteSlider from './components/DiscreteSlider';
import io from 'socket.io-client';
import React from 'react';
import { useAppDispatch, useAppSelector } from './store/Store';
import {
  changeUpdateInterval,
  setIsFiltering,
  setStocksInfo,
  updateHiddenTicker,
} from './store/BasicTableSlice';
import { IStocksInfo } from '../types';

const ENDPOINT = 'ws://localhost:4000';

function App() {
  const [socket] = React.useState(io(ENDPOINT));

  const dispatch = useAppDispatch();
  const { tickers, isFiltering, hiddenTickers, filteredTickers } =
    useAppSelector((state) => ({
      tickers: state.stocksInfo.tickers,
      filteredTickers: state.stocksInfo.filteredTickers,
      isFiltering: state.stocksInfo.isFiltering,
      hiddenTickers: state.stocksInfo.hiddenTickers,
    }));

  React.useEffect(() => {
    socket.emit('start');
    socket.on('ticker', (data: IStocksInfo[]) => {
      dispatch(setStocksInfo(data));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const tickersForDisplaying = React.useMemo(
    () => (isFiltering ? tickers : filteredTickers),
    [tickers, hiddenTickers, isFiltering]
  );

  const handleChangeFiltering = () => {
    dispatch(setIsFiltering(!isFiltering));
  };

  const handleIsHiddenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    ticker: string
  ) => {
    dispatch(updateHiddenTicker({ ticker, isHidden: !event.target.checked }));
    console.log(event.target.checked);
  };

  const handleIntervalChange = (_event: Event, value: number) => {
    dispatch(changeUpdateInterval(value));
    socket.emit('updateInterval', value);
  };

  return (
    <Box>
      <Header />
      <Box
        marginTop={2}
        marginBottom={2}
        marginRight={5}
        marginLeft={5.5}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} alignItems={'center'}>
          <DiscreteSlider onChange={handleIntervalChange} />
          <Typography color={'#505050'} fontWeight={'bold'} marginLeft={5}>
            {' '}
            Here you can change updating time interval
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Typography color={'#505050'} fontWeight={'bold'} marginRight={5}>
            Here you can set the list
          </Typography>
          <Button variant={'contained'} onClick={handleChangeFiltering}>
            {isFiltering ? 'Save' : 'Filter list'}
          </Button>
        </Box>
      </Box>

      <BasicTable
        stocksData={tickersForDisplaying}
        withCheckboxes={isFiltering}
        onCheckboxChange={handleIsHiddenChange}
        hiddenTickers={hiddenTickers}
      />
    </Box>
  );
}

export default App;
