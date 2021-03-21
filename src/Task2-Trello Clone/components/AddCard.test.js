import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import AddCard from './AddCard'
import axios from 'axios'

jest.setTimeout(25000)
jest.mock('axios')

beforeEach(() => {
  render(
    <MemoryRouter>
      <AddCard
        boardId="6034a4de498fab142337023c"
        listId="1"
        getCardsForList={() => {}}
      />
    </MemoryRouter>
  )
})

describe('<AddCard/>', () => {
  it('should check if new card is created', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddCardForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewCardName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'new' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewCardSubmitButton'
    )

    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(createNewListSubmitButton)
    })
  })
  it('should check if new card is created on pressing enter', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddCardForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewCardName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'new' } })
    const spy = jest.spyOn(axios, 'post')
    await act(async () => {
      fireEvent.keyDown(inputNewListName, {
        key: 'Enter',
        code: 13,
        charCode: 13
      })
    })
    expect(spy).toHaveBeenCalled()
  })
  it('should check if new card is not created any other key is pressed', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddCardForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewCardName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'new' } })
    const spy = jest.spyOn(axios, 'post')
    await act(async () => {
      fireEvent.keyDown(inputNewListName, {
        key: 'Alt',
        code: 18,
        charCode: 18
      })
    })
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should check if new card not created when empty string is passed', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new'
      }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddCardForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewCardName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: '' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewCardSubmitButton'
    )

    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(createNewListSubmitButton)
    })
  })
  it('should throw error if card is not updated', async () => {
    act(() => {
      axios.post.mockImplementation(() => {
        return Promise.reject(new Error('Oops Something Went Wrong'))
      })
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddCardForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewCardName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'sdsds' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewCardSubmitButton'
    )
    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(createNewListSubmitButton)
    })
    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
})
