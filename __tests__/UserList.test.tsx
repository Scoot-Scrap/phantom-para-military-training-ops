import { render, screen } from '@testing-library/react'
import UserList from '../components/UserList'

test('shows skeletons while loading', () => {
  render(<UserList />)
  // Expect 5 skeleton elements
  expect(screen.getAllByRole('status')).toHaveLength(5)
})

test('displays users when data is present', () => {
  const users = [{ id: 1, name: 'Alice' }]
  render(<UserList users={users} />)
  expect(screen.getByText('Alice')).toBeInTheDocument()
})

test('shows error message on fetch failure', () => {
  render(<UserList error="Network error" />)
  expect(screen.getByText(/network error/i)).toBeInTheDocument()
})