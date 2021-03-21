import React from 'react'
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { MemoryRouter, Router } from 'react-router-dom'
import NavBar from './NavBar'

jest.setTimeout(25000)

describe('<NavBar/>', () => {
  it('should check if the search button is working', async () => {
    render(
      <MemoryRouter>
        <NavBar currentSearch="" setCurrentSearch={() => {}} />
      </MemoryRouter>
    )
    const searchField = await waitFor(
      () => screen.getByTestId('searchInputField'),
      {
        timeout: 3000
      }
    )
    expect(searchField).toBeInTheDocument()
    fireEvent.change(searchField, { target: { value: 'd' } })
  })
  it('should check if redirected to Boards Page when clicked on trello image', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <NavBar currentSearch="" setCurrentSearch={() => {}} />
      </Router>
    )
    const navHomeLink = await waitFor(
      () => screen.getByTestId('navBarHomeLink'),
      {
        timeout: 3000
      }
    )
    expect(navHomeLink).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(navHomeLink)
    })
    expect(history.location.pathname).toBe('/boards')
  })
  it('should check if redirected to Boards Page when clicked on Boards icon', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <NavBar currentSearch="" setCurrentSearch={() => {}} />
      </Router>
    )
    const navHomeLink = await waitFor(
      () => screen.getByTestId('navbarBoards'),
      {
        timeout: 3000
      }
    )
    expect(navHomeLink).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(navHomeLink)
    })
    expect(history.location.pathname).toBe('/boards')
  })
  it('should check if redirected to HomePage when clicked on  Home icon', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <NavBar currentSearch="" setCurrentSearch={() => {}} />
      </Router>
    )
    const navHomeLink = await waitFor(() => screen.getByTestId('navbarHome'), {
      timeout: 3000
    })
    expect(navHomeLink).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(navHomeLink)
    })
    expect(history.location.pathname).toBe('/')
  })
})
