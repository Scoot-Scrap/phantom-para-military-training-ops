import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import VitalCard from '../app/components/VitalCard';

describe('VitalCard', () => {
  it('renders without errors', () => {
    const { getByText } = render(<VitalCard label="Test" value="123" />);
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByText('123')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<VitalCard label="Heart Rate" value="80 bpm" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});