import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import axios from 'axios'
import DashBoardCard from '../components/DashBoardCard'

jest.setTimeout(25000)
jest.mock('axios')
beforeEach(() => {
  render(
    <MemoryRouter>
      <DashBoardCard
        boardId='1'
        card={{ name: 'vaibhav', id: 1 }}
        getCardsForList={() => {}}
      />
    </MemoryRouter>
  )
})
describe('<DashBoardCard />', () => {
  it('should check if the card is deleted', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new',
      }
      axios.delete.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone',
            },
          ],
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const deleteIcon = await waitFor(() => screen.getByTestId('deleteIcon'), {
      timeout: 3000,
    })
    expect(deleteIcon).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(deleteIcon)
    })
  })
  it('should check if the card is updated when pressed submit button', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new',
      }
      axios.put.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone',
            },
          ],
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const openForm = await waitFor(
      () => screen.getByTestId('makeCardEditable'),
      {
        timeout: 3000,
      }
    )
    await act(async () => {
      fireEvent.click(openForm)
    })
    const updateCardName = await waitFor(
      () => screen.getByTestId('updateCardInputField'),
      {
        timeout: 3000,
      }
    )
    expect(updateCardName).toBeInTheDocument()

    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })
    const updateCardSubmitButton = await waitFor(
      () => screen.getByTestId('updateCardSubmitButton'),
      {
        timeout: 3000,
      }
    )
    await act(async () => {
      fireEvent.click(updateCardSubmitButton)
    })
  })
  it('should check if the card is updated when pressed Enter', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new',
      }
      axios.put.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone',
            },
          ],
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const openForm = await waitFor(
      () => screen.getByTestId('makeCardEditable'),
      {
        timeout: 3000,
      }
    )
    await act(async () => {
      fireEvent.click(openForm)
    })
    const updateCardName = await waitFor(
      () => screen.getByTestId('updateCardInputField'),
      {
        timeout: 3000,
      }
    )
    expect(updateCardName).toBeInTheDocument()

    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })

    const spy = jest.spyOn(axios, 'put')
    await act(async () => {
      fireEvent.keyDown(updateCardName, {
        key: 'Enter',
        code: 13,
        charCode: 13,
      })
    })
    expect(spy).toHaveBeenCalled()
  })
  it('should check if the card is not updated when pressed any other key', async () => {
    act(() => {
      const data = {
        id: '1',
        idBoard: '6034a4de498fab142337023c',
        idList: '1',
        name: 'new',
      }
      axios.put.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone',
            },
          ],
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const openForm = await waitFor(
      () => screen.getByTestId('makeCardEditable'),
      {
        timeout: 3000,
      }
    )
    await act(async () => {
      fireEvent.click(openForm)
    })
    const updateCardName = await waitFor(
      () => screen.getByTestId('updateCardInputField'),
      {
        timeout: 3000,
      }
    )
    expect(updateCardName).toBeInTheDocument()

    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })

    const spy = jest.spyOn(axios, 'put')
    await act(async () => {
      fireEvent.keyDown(updateCardName, {
        key: 'Alt',
        code: 18,
        charCode: 18,
      })
    })
    expect(spy).toHaveBeenCalledTimes(0)
  })
  it('should check if error occurred while deleting card', async () => {
    act(() => {
      axios.delete.mockImplementation(() => {
        return Promise.reject(new Error('Oops Something Went Wrong'))
      })
      const cardData = {
        data: [
          {
            id: '1',
            name: 'newone',
          },
        ],
      }
      axios.get.mockImplementation(() => Promise.resolve(cardData))
    })
    const deleteIcon = await waitFor(() => screen.getByTestId('deleteIcon'), {
      timeout: 3000,
    })
    expect(deleteIcon).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(deleteIcon)
    })
    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
  it('should check if any error occurred while the card is updated', async () => {
    act(() => {
      axios.put.mockImplementation(() => {
        return Promise.reject(new Error('Oops Something Went Wrong'))
      })
      act(() => {
        const cardData = {
          data: [
            {
              id: '1',
              name: 'newone',
            },
          ],
        }
        axios.get.mockImplementation(() => Promise.resolve(cardData))
      })
    })
    const openForm = await waitFor(
      () => screen.getByTestId('makeCardEditable'),
      {
        timeout: 3000,
      }
    )
    await act(async () => {
      fireEvent.click(openForm)
    })
    const updateCardName = await waitFor(
      () => screen.getByTestId('updateCardInputField'),
      {
        timeout: 3000,
      }
    )
    expect(updateCardName).toBeInTheDocument()

    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })

    await act(async () => {
      fireEvent.keyDown(updateCardName, {
        key: 'Enter',
        code: 13,
        charCode: 13,
      })
    })
    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
})
