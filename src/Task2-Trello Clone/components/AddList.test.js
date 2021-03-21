import React from 'react'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddList from './AddList'
import axios from 'axios'

jest.setTimeout(25000)
jest.mock('axios')

beforeEach(() => {
  render(
    <MemoryRouter>
      <AddList boardId="6034a4de498fab142337023c" getBoardsLists={() => {}} />
    </MemoryRouter>
  )
})
describe('<AddList/>', () => {
  it('should check if new list is created', async () => {
    act(() => {
      const data = { id: '1', idBoard: '6034a4de498fab142337023c', name: 'new' }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const listData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(listData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddListForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewListName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'new' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewListSubmitButton'
    )
    const spy = jest.spyOn(axios, 'post')
    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(createNewListSubmitButton)
    })
    expect(spy).toHaveBeenCalled()
  })
  it('should check if new list is created on pressing Enter', async () => {
    act(() => {
      const data = { id: '1', idBoard: '6034a4de498fab142337023c', name: 'new' }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const listData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(listData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddListForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewListName')

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
  it('should not create a new list if some other key is pressed', async () => {
    act(() => {
      const data = { id: '1', idBoard: '6034a4de498fab142337023c', name: 'new' }
      axios.post.mockImplementation(() => Promise.resolve(data))
      act(() => {
        const listData = {
          data: [
            {
              id: '1',
              name: 'newone'
            }
          ]
        }
        axios.get.mockImplementation(() => Promise.resolve(listData))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddListForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewListName')

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
  it('should check that addList form is closed when clicked again', async () => {
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddListForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    act(() => {
      fireEvent.click(addListContainer)
    })
  })
  it('should thow error if unable to add list', async () => {
    act(() => {
      const listData = {
        data: [
          {
            id: '1',
            name: 'newone'
          }
        ]
      }
      axios.get.mockImplementation(() => Promise.resolve(listData))

      axios.post.mockImplementation(() => {
        return Promise.reject(new Error('Oops Something Went Wrong'))
      })
    })
    const addListContainer = await waitFor(
      () => screen.getByTestId('openAddListForm'),
      {
        timeout: 3000
      }
    )
    expect(addListContainer).toBeInTheDocument()
    fireEvent.click(addListContainer)
    const inputNewListName = screen.getByTestId('inputNewListName')

    expect(inputNewListName).toBeInTheDocument()
    fireEvent.change(inputNewListName, { target: { value: 'new' } })

    const createNewListSubmitButton = screen.getByTestId(
      'createNewListSubmitButton'
    )

    expect(createNewListSubmitButton).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(createNewListSubmitButton)
    })
    expect(screen.getByTestId('Oops Something Went Wrong')).toBeInTheDocument()
  })
})
