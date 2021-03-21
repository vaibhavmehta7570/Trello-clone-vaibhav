import React, { useState, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { ImCancelCircle } from 'react-icons/im'
import LoaderSecondary from '../components/LoaderSecondary'

function AddCard({ listId, boardId, getCardsForList }) {
  const formStyling = useRef(null)
  const [newCardName, setCardName] = useState('')
  const [error, setErrorState] = useState('')
  const [loading, setLoadingState] = useState(false)
  const handleNewCard = (e) => {
    setCardName(e.target.value)
  }
  const addNewCard = async (e) => {
    try {
      e.preventDefault()
      setLoadingState(true)
      if (newCardName !== '') {
        await axios.post(
          `https://api.trello.com/1/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idList=${listId}&name=${newCardName}`
        )
        const getCards = await axios.get(
          `https://api.trello.com/1/boards/${boardId}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
        )
        setLoadingState(false)
        getCardsForList(getCards.data)
        setCardName('')
        openForm()
      }
    } catch (e) {
      setErrorState('Oops Something Went Wrong')
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addNewCard(e)
    }
  }
  const openForm = () => {
    if (formStyling.current.style.display === 'flex') {
      formStyling.current.style.display = 'none'
    } else {
      formStyling.current.style.display = 'flex'
    }
  }
  if (error !== '') {
    return <div data-testid={error}></div>
  }
  return (
    <div className="add-card-button-wrapper">
      <div className="add-new-card">
        {loading ? (
          <LoaderSecondary />
        ) : (
          <div
            className="add-card"
            onClick={openForm}
            data-testid="openAddCardForm"
          >
            <h1>+ Add Card</h1>
          </div>
        )}

        <div className="add-card-form" ref={formStyling}>
          <form className="form" onSubmit={addNewCard}>
            <textarea
              type="text"
              placeholder="Enter a title for this card..."
              value={newCardName}
              onChange={handleNewCard}
              onKeyDown={(e) => handleKeyDown(e)}
              data-testid="inputNewCardName"
            ></textarea>
            <div className="update-card-options">
              <input
                type="submit"
                value="Add Card"
                data-testid="createNewCardSubmitButton"
              />
              <ImCancelCircle onClick={openForm} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
AddCard.propTypes = {
  listId: PropTypes.string,
  boardId: PropTypes.string,
  getCardsForList: PropTypes.func
}

export default AddCard
