import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from '../components/UserList';

describe('UserList Component', () => {
  test('shows skeletons while loading', () => {
    render(<UserList />);
    // We render five .skeleton divs when users == null
    const skeletons = screen.getAllByRole('presentation');
    expect(skeletons).toHaveLength(5);
  });

  test('displays users when data is provided', () => {
    const users = [{ id: 1, name: 'Alice' }];
    render(<UserList users={users} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('shows error message on fetch failure', () => {
    render(<UserList error="Network error" />);
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});