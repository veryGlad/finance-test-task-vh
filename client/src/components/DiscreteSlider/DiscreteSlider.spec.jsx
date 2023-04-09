import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DiscreteSlider from './DiscreteSlider';

describe('DiscreteSlider component', () => {
  it('Should render', () => {
    const onChange = jest.fn();
    render(<DiscreteSlider onChange={onChange} />);
    expect(screen.getByLabelText('Update time')).toBeInTheDocument();
  });
  it('Should change value', () => {
    const onChange = jest.fn();
    render(<DiscreteSlider onChange={onChange} />);
    const slider = screen.getByTestId(`slider`);
    fireEvent.change(slider, { target: { value: 25 } });
    expect(onChange).toBeCalledWith(expect.anything(), 25000);
  });
});
