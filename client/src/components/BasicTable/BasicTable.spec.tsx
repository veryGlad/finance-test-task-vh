import BasicTable from './BasicTable';
import { fireEvent, render, screen } from '@testing-library/react';
import { tickersMock } from '../../mocks';

describe('BasicTable', () => {
  it('Should render', async () => {
    const onCheckboxChange = jest.fn();
    await render(
      <BasicTable
        hiddenTickers={[]}
        stocksData={tickersMock}
        onCheckboxChange={onCheckboxChange}
        withCheckboxes={false}
      />
    );
    expect(await screen.getByText('AAPL')).toBeInTheDocument();
  });
  it('Should set correct checkboxes statuses', () => {
    const onCheckboxChange = jest.fn();
    render(
      <BasicTable
        hiddenTickers={['GOOGL']}
        stocksData={tickersMock}
        onCheckboxChange={onCheckboxChange}
        withCheckboxes={true}
      />
    );
    const googleCheckbox = screen.getByTestId('GOOGL-checkbox');
    const appleCheckbox = screen.getByTestId('AAPL-checkbox');
    expect(googleCheckbox).toHaveProperty('checked', false);
    expect(appleCheckbox).toHaveProperty('checked', true);
  });
  it('Should change checkbox status', () => {
    const onCheckboxChange = jest.fn();
    render(
      <BasicTable
        hiddenTickers={['GOOGL']}
        stocksData={tickersMock}
        onCheckboxChange={onCheckboxChange}
        withCheckboxes={true}
      />
    );
    const googleCheckbox = screen.getByTestId('GOOGL-checkbox');
    fireEvent.click(googleCheckbox);
    expect(onCheckboxChange).toBeCalled();
    expect(googleCheckbox).toHaveProperty('checked', false);
  });
});
