import App from './App'
import React from 'react'
import { render, screen } from '@testing-library/react'

test('renders learn react link', () => {
  render(<App />)
  const element = screen.getByText(/hello world/i)
  expect(element).toBeInTheDocument()
})
