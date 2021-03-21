import React, { useState, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import LoaderSecondary from './LoaderSecondary'
import { ImCancelCircle } from 'react-icons/im'

function AddList({ boardId, getBoardsLists }) {
  const formStyling = useRef(null)
  const [newListName, setListName] = useState('')
  const [error, setErrorState] = useState('')
  const [loading, setLoading] = useState(false)
  const handleNewList = (e) => {
    setListName(e.target.value)
  }
  const addNewList = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      await axios.post(
        `https://api.trello.com/1/lists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${newListName}&idBoard=${boardId}&pos=bottom`
      )
      const getLists = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      getBoardsLists(getLists.data)
      openForm()
      setLoading(false)
    } catch (e) {
      setErrorState('Oops Something Went Wrong')
    }
  }
  const openForm = () => {
    if (formStyling.current.style.display === 'flex') {
      formStyling.current.style.display = 'none'
      setListName('')
    } else {
      formStyling.current.style.display = 'flex'
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addNewList(e)
    }
  }

  if (error !== '') {
    return <div data-testid={error}>Something Went Wrong!</div>
  }
  return (
    <div className='add-button-wrapper'>
      <div className='add-new-list'>
        {loading ? (
          <LoaderSecondary />
        ) : (
          <div
            className='add-list'
            data-testid='openAddListForm'
            onClick={openForm}
          >
            <h1> + Add New List</h1>
          </div>
        )}

        <form
          className='add-board-form'
          ref={formStyling}
          onSubmit={addNewList}
        >
          <input
            type='text'
            placeholder='List Name'
            data-testid='inputNewListName'
            value={newListName}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={handleNewList}
          ></input>
          <div className='update-list-options'>
            <input
              type='submit'
              value='Add List'
              data-testid='createNewListSubmitButton'
            />
            <ImCancelCircle onClick={openForm} />
          </div>
        </form>
      </div>
    </div>
  )
}
AddList.propTypes = {
  boardId: PropTypes.string,
  getBoardsLists: PropTypes.func,
}

export default AddList
