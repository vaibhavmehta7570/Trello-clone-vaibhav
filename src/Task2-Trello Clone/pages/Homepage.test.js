/* istanbul ignore file */
import React from 'react'
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import HomePage from './HomePage'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
jest.setTimeout(25000)
jest.mock('axios')

describe('<HomePage/>', () => {
  beforeEach(async () => {
    await act(async () => {
      const boardData = {
        data: [
          {
            id: '1',
            name: 'BoardName 1',
            prefs: {
              backgroundImage: 'url'
            }
          }
        ]
      }
      axios.get.mockImplementation(async (url) => {
        return boardData
      })
      axios.put.mockImplementation(() => {})
      axios.delete.mockImplementation(() => {})
    })
    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage currentSearch="" />
        </MemoryRouter>
      )
    })
  })

  it('should show HomePage title after api calls are made', async () => {
    const title = await waitFor(() => screen.getByTestId('homePageTitle'), {
      timeout: 3000
    })

    expect(title).toBeInTheDocument()
  })
  it('should check if the slider works properly', async () => {
    const sliderButton = await waitFor(
      () => screen.getByTestId('sliderButton'),
      {
        timeout: 3000
      }
    )
    await act(async () => {
      fireEvent.click(sliderButton)
    })

    const sliderItem = await waitFor(() => screen.queryByTestId('sliderItem'), {
      timeout: 3000
    })
    expect(sliderItem).toBe(null)
    await act(async () => {
      fireEvent.click(sliderButton)
    })
    const sliderItemAgain = await waitFor(
      () => screen.getByTestId('sliderItem'),
      {
        timeout: 3000
      }
    )
    expect(sliderItemAgain).toBeInTheDocument()
  })
  it('should check if input field is displayed when the clicked on board Name', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')

    expect(inputForAddingBoard).toBeInTheDocument()
  })
  it('should check if input field is closed when clicked again', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    expect(screen.queryByText('BoardName')).toBe(null)
  })
  it('should check if New Board is created on pressing Enter', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(inputForAddingBoard, {
        target: { value: 'createNewBoard' }
      })
    })

    const spy = jest.spyOn(axios, 'post')
    await act(async () => {
      fireEvent.keyDown(inputForAddingBoard, {
        key: 'Enter',
        code: 13,
        charCode: 13
      })
    })
    expect(spy).toHaveBeenCalled()
  })
  it('should check if New Board is not created on pressing some key other than Enter', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(inputForAddingBoard, {
        target: { value: 'createNewBoard' }
      })
    })

    const spy = jest.spyOn(axios, 'post')
    await act(async () => {
      fireEvent.keyDown(inputForAddingBoard, {
        key: 'Alt',
        code: 18,
        charCode: 18
      })
    })
    expect(spy).toHaveBeenCalledTimes(0)
  })
  it('should check if New Board is created and deleted', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(inputForAddingBoard, {
        target: { value: 'createNewBoard' }
      })
    })

    const addBoardButton = await waitFor(
      () => screen.getByTestId('addBoardButton'),
      {
        timeout: 3000
      }
    )
    await act(async () => {
      fireEvent.click(addBoardButton)
    })

    const deleteButton = await waitFor(() => screen.getByTestId('deleteCard'), {
      timeout: 3000
    })
    expect(deleteButton).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(deleteButton)
    })

    const spy = jest.spyOn(axios, 'delete')
    expect(spy).toHaveBeenCalled()
  })
})

describe('< HomePage/>', () => {
  it('should check for the faliure for axios get request', async () => {
    axios.get.mockImplementation(() => {
      return Promise.reject(new Error('Oops Something Went Wrong'))
    })
    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage currentSearch="" />
        </MemoryRouter>
      )
    })

    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
  it('should run catch block if the unable to update the board Name', async () => {
    await act(async () => {
      const boardData = {
        data: [
          {
            id: '1',
            name: 'BoardName 1',
            prefs: {
              backgroundImage: 'url'
            }
          }
        ]
      }
      axios.get.mockImplementation(async (url) => {
        return boardData
      })
      axios.delete.mockImplementation(() => {})
      axios.post.mockImplementation(() => {
        return Promise.reject(new Error('Oops Something Went Wrong'))
      })
      render(
        <MemoryRouter>
          <HomePage currentSearch="" />
        </MemoryRouter>
      )
    })

    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(addNewBoard)
    })

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(inputForAddingBoard, {
        target: { value: 'createNewBoard' }
      })
    })

    const addBoardButton = await waitFor(
      () => screen.getByTestId('addBoardButton'),
      {
        timeout: 3000
      }
    )
    await act(async () => {
      fireEvent.click(addBoardButton)
    })
    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
})
