import { render } from '@testing-library/react';
import React from 'react';
import NoPage from '../pages/NoPage';

describe('NoPage component', () => {
  it('renders the 404 message', () => {
    const { getByText } = render(<NoPage />);
    const errorMessage = getByText('404');
    expect(errorMessage).toBeInTheDocument();
  });
});
