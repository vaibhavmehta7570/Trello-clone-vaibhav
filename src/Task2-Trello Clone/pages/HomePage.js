import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import LoaderMain from '../components/LoaderMain'
import { ImCancelCircle } from 'react-icons/im'
import {
  IoPersonOutline,
  IoPeopleSharp,
  IoSettingsSharp,
} from 'react-icons/io5'
import { DiTrello } from 'react-icons/di'
import { BiHomeSmile, BiTable } from 'react-icons/bi'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import { FiCheckSquare } from 'react-icons/fi'

import { BsHeart } from 'react-icons/bs'
import PropTypes from 'prop-types'

function HomePage({ currentSearch }) {
  const [homePageData, setHomePageData] = useState([])
  const [newBoardName, setBoardName] = useState('')
  const [loading, setLoadingState] = useState(true)
  const formStyling = useRef(null)
  const [error, setErrorState] = useState('')
  const [slider, setSlider] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      try {
        const getHomePageData = await axios.get(
          `https://api.trello.com/1/members/me/boards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
        )
        setLoadingState(false)
        setHomePageData(getHomePageData.data)
      } catch (e) {
        setLoadingState(false)
        setErrorState('Oops Something Went Wrong')
      }
    }
    fetch()
  }, [])
  const createNewBoard = async (e) => {
    e.preventDefault()
    openForm()
    try {
      setLoadingState(true)
      await axios.post(
        `https://api.trello.com/1/boards/?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${newBoardName}`
      )
      const updatedBoards = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      )
      setLoadingState(false)

      setHomePageData(updatedBoards.data)
    } catch (e) {
      setErrorState('Oops Something Went Wrong')
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      createNewBoard(e)
    }
  }
  const openForm = () => {
    if (formStyling.current.style.display === 'block') {
      formStyling.current.style.display = 'none'
      setBoardName('')
    } else {
      formStyling.current.style.display = 'block'
    }
  }
  const handleBoardName = (e) => {
    setBoardName(e.target.value)
  }
  if (loading && error === '') {
    return <LoaderMain />
  } else if (error !== '') {
    return <div data-testid={error}></div>
  }
  return (
    <div className='home-page-content'>
      <div className='home-page' data-testid='homePage'>
        <div className='sideBar'>
          <div className='sidebar-div active'>
            <DiTrello />
            <h1>Board</h1>
          </div>
          <div className='sidebar-div'>
            <DiTrello />
            <h1>Templates</h1>
          </div>
          <div className='sidebar-div'>
            <BiHomeSmile />
            <h1>Home</h1>
          </div>
          <div className='sidebar-drop-down'>
            <div className='header'>
              <h1>Teams</h1>
              <h1>+</h1>
            </div>
            <div
              className='drop-down'
              data-testid='sliderButton'
              onClick={() => {
                if (slider) {
                  setSlider(false)
                } else {
                  setSlider(true)
                }
              }}
            >
              <div className='drop-down-header'>
                <IoPeopleSharp />
                <h1>{`Vaibhav Mehta's WorkSpace`}</h1>
              </div>
              {slider ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
            </div>
            {slider ? (
              <div></div>
            ) : (
              <div>
                <div className='drop-down-items' data-testid='sliderItem'>
                  <div className='drop-down-item'>
                    <FiCheckSquare />
                    <h1>{`Getting Started`}</h1>
                  </div>
                </div>
                <div className='drop-down-items'>
                  <div className='drop-down-item'>
                    <DiTrello />
                    <h1>{`Board`}</h1>
                  </div>
                </div>
                <div className='drop-down-items'>
                  <div className='drop-down-item'>
                    <BsHeart />
                    <h1>{`Highlights`}</h1>
                  </div>
                </div>
                <div className='drop-down-items'>
                  <div className='drop-down-item'>
                    <BiTable />
                    <h1>{`Team Table`}</h1>
                  </div>
                </div>
                <div className='drop-down-items'>
                  <div className='drop-down-item'>
                    <IoPeopleSharp />
                    <h1>{`Members`}</h1>
                  </div>
                </div>
                <div className='drop-down-items'>
                  <div className='drop-down-item'>
                    <IoSettingsSharp />
                    <h1>{`Settings`}</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='home-page-block'>
          <div className='home-page-title' data-testid='homePageTitle'>
            <IoPersonOutline />
            <h1>Personal Boards</h1>
          </div>

          <div className='home-page-container'>
            {homePageData
              .filter((ele) =>
                ele.name.toLowerCase().includes(currentSearch.toLowerCase())
              )
              .map((ele) => {
                return (
                  <Card
                    value={ele}
                    key={ele.id}
                    boardState={homePageData}
                    setHomePageData={setHomePageData}
                  ></Card>
                )
              })}
            <div className='add-button-wrapper'>
              <div className='add-new-board'>
                <div
                  className='add-board-card'
                  onClick={openForm}
                  data-testid='addNewBoard'
                >
                  <h1>Create New Board</h1>
                </div>
                <form
                  className='add-board-form'
                  ref={formStyling}
                  onSubmit={createNewBoard}
                >
                  <textarea
                    type='text'
                    placeholder='BoardName'
                    data-testid='inputForAddingBoard'
                    onKeyDown={(e) => {
                      handleKeyDown(e)
                    }}
                    onChange={handleBoardName}
                  ></textarea>

                  <div className='update-list-options'>
                    <input
                      type='submit'
                      value='Create New Board'
                      data-testid='addBoardButton'
                    />
                    <ImCancelCircle
                      className='board-cancel-svg'
                      onClick={openForm}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
HomePage.propTypes = {
  currentSearch: PropTypes.string,
}
export default HomePage
