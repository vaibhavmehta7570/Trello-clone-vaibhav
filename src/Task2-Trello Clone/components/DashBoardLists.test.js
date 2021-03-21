import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import axios from 'axios'
import DashBoardLists from './DashBoardLists'

jest.setTimeout(25000)
jest.mock('axios')

beforeEach(() => {
  render(
    <MemoryRouter>
      <DashBoardLists
        boardId='1'
        list={{ name: 'vaibhav', id: 1 }}
        getBoardsLists={() => {}}
      />
    </MemoryRouter>
  )
})

describe('<DashBoardList/>', () => {
  it('should check is the list  archived', async () => {
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
    const spy = jest.spyOn(axios, 'put')
    const archiveList = await waitFor(
      () => screen.getByTestId('archiveListButton'),
      {
        timeout: 3000,
      }
    )
    expect(archiveList).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(archiveList)
    })

    expect(spy).toHaveBeenCalled()
  })
  it('should check if any error occurred while achieving list', async () => {
    act(() => {
      axios.put.mockImplementation(() => {
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
    const archiveList = await waitFor(
      () => screen.getByTestId('archiveListButton'),
      {
        timeout: 3000,
      }
    )
    expect(archiveList).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(archiveList)
    })
    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
  it('should check if the List Name is updated', async () => {
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
    const openListForm = await waitFor(
      () => screen.getByTestId('openListForm'),
      {
        timeout: 3000,
      }
    )
    expect(openListForm).toBeInTheDocument()
    fireEvent.click(openListForm)
    const updateCardName = await waitFor(
      () => screen.getByTestId('listNameInputField'),
      {
        timeout: 3000,
      }
    )
    expect(updateCardName).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })
    const spy = jest.spyOn(axios, 'put')
    const updateCardSubmitButton = await waitFor(
      () => screen.getAllByTestId('updateListSubmitButton'),
      {
        timeout: 3000,
      }
    )
    await act(async () => {
      fireEvent.click(updateCardSubmitButton[0])
    })
    expect(spy).toHaveBeenCalled()
  })
  it('should check if error occurred while updating the List Name', async () => {
    act(() => {
      axios.put.mockImplementation(() => {
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
    const openListForm = await waitFor(
      () => screen.getByTestId('openListForm'),
      {
        timeout: 3000,
      }
    )
    expect(openListForm).toBeInTheDocument()
    fireEvent.click(openListForm)
    const updateCardName = await waitFor(
      () => screen.getByTestId('listNameInputField'),
      {
        timeout: 3000,
      }
    )
    expect(updateCardName).toBeInTheDocument()
    await act(async () => {
      fireEvent.change(updateCardName, { target: { value: 'New Name' } })
    })

    const updateCardSubmitButton = await waitFor(
      () => screen.getAllByTestId('updateListSubmitButton'),
      {
        timeout: 3000,
      }
    )
    await act(async () => {
      fireEvent.click(updateCardSubmitButton[0])
    })
    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
})
