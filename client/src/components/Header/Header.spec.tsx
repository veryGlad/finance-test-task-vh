import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('Should render', () => {
    render(<Header />);
    const headerElement = screen.getByText('Finance');
    expect(headerElement).toBeInTheDocument();
  });
});
