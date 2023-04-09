import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Checkbox, Typography } from '@mui/material';
import { IStocksInfo } from '../../../types';

interface IStocksTableProps {
  stocksData: IStocksInfo[];
  withCheckboxes: boolean;
  onCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    ticker: string
  ) => void;
  hiddenTickers: string[];
}

const BasicTable: React.FC<IStocksTableProps> = ({
  stocksData,
  withCheckboxes,
  onCheckboxChange,
  hiddenTickers,
}) => {
  function formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${time} ${date}`;
  }

  return (
    <Box marginRight={5} marginLeft={5}>
      <TableContainer component={Paper} style={{ backgroundColor: '#D3D3D3' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell width={'40px'}></TableCell>
              <TableCell>
                <Typography color={'#585858'} fontWeight={'bold'}>
                  Ticker
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography color={'#585858'} fontWeight={'bold'}>
                  Exchange
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography color={'#585858'} fontWeight={'bold'}>
                  Price
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography color={'#585858'} fontWeight={'bold'}>
                  Change $
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography color={'#585858'} fontWeight={'bold'}>
                  Change %
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography color={'#585858'} fontWeight={'bold'}>
                  Dividend
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography color={'#585858'} fontWeight={'bold'}>
                  Last trade
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocksData.map(
              ({
                ticker,
                exchange,
                price,
                change,
                change_percent,
                dividend,
                last_trade_time,
              }) => (
                <TableRow
                  key={ticker}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {withCheckboxes && (
                      <Checkbox
                        inputProps={
                          {
                            'data-testid': `${ticker}-checkbox`,
                          } as React.InputHTMLAttributes<HTMLInputElement>
                        }
                        size={'small'}
                        checked={!hiddenTickers.includes(ticker)}
                        onChange={(e) => onCheckboxChange(e, ticker)}
                      />
                    )}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Typography
                      fontWeight={'bold'}
                      marginTop={1}
                      marginBottom={1}
                    >
                      {ticker}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography marginTop={1} marginBottom={1}>
                      {exchange}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography
                      fontWeight={'bold'}
                      marginTop={1}
                      marginBottom={1}
                    >
                      {price}$
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography
                      color={change >= 0 ? 'green' : 'red'}
                      marginTop={1}
                      marginBottom={1}
                    >
                      {change}$
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography
                      color={change_percent >= 0 ? 'green' : 'red'}
                      marginTop={1}
                      marginBottom={1}
                    >
                      {change_percent}%
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography marginTop={1} marginBottom={1}>
                      {dividend}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography marginTop={1} marginBottom={1}>
                      {formatDateTime(last_trade_time)}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BasicTable;
