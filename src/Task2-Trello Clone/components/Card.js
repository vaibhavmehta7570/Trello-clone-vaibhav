import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../task2.css'
import { AiFillDelete } from 'react-icons/ai'
// import { GrUpdate } from 'react-icons/gr'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoaderMain from './LoaderMain'

function Card({ value, setHomePageData }) {
  const [loading, setLoading] = useState(false)
  const deleteBoardCard = async () => {
    setLoading(true)
    await axios.delete(
      `https://api.trello.com/1/boards/${value.id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
    )
    const getBoards = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
    )
    setLoading(false)
    setHomePageData(getBoards.data)
  }

  return (
    <div
      className="homepage-card"
      style={{
        backgroundImage: `url(${value.prefs.backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: `${value.prefs.backgroundColor}`
      }}
    >
      <Link
        key={value.id}
        to={`/boards/${value.id}`}
        style={{ textDecoration: 'none', width: '100%' }}
      >
        {loading ? (
          <LoaderMain />
        ) : (
          <div>
            <div>
              <div className="homepage-card-data">
                <h1 data-testid="newBoardName">{value.name}</h1>
              </div>
            </div>
          </div>
        )}
      </Link>
      <div className="delete-icon-container">
        <AiFillDelete
          title="Delete Board"
          data-testid="deleteCard"
          className="delete-icon"
          onClick={deleteBoardCard}
        />
      </div>
    </div>
  )
}

Card.propTypes = {
  value: PropTypes.object.isRequired,
  setHomePageData: PropTypes.func.isRequired
}
export default Card
