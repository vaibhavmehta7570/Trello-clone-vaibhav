import React from 'react'
import '../task2.css'
import { useHistory } from 'react-router-dom'
import { BsSearch, BsInfoCircle } from 'react-icons/bs'
import { BiHomeAlt } from 'react-icons/bi'
import { DiTrello } from 'react-icons/di'
import { RiDashboardLine } from 'react-icons/ri'
import { AiOutlineBell } from 'react-icons/ai'
import { IoAdd } from 'react-icons/io5'
import PropTypes from 'prop-types'

function NavBar({ currentSearch, setCurrentSearch }) {
  const history = useHistory()
  const handleClick = ({ name }) => {
    if (name === 'boards') history.push('/boards')
    if (name === 'home') history.push('/')
  }
  const handleChange = async (e) => {
    setCurrentSearch(e.target.value)
  }
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <div className='navbar-left-setting'>
          <RiDashboardLine />
        </div>
        <div
          className='navbar-left-home'
          data-testid='navbarHome'
          onClick={() => handleClick({ name: 'home' })}
        >
          <BiHomeAlt />
        </div>
        <div
          className='navbar-left-board'
          data-testid='navbarBoards'
          onClick={() => handleClick({ name: 'boards' })}
        >
          <DiTrello />
          <h1>Boards</h1>
        </div>
        <div className='navbar-left-search'>
          <input
            type='text'
            placeholder='Jump to ...'
            value={currentSearch}
            data-testid='searchInputField'
            onChange={(e) => handleChange(e)}
          ></input>
          <BsSearch />
        </div>
      </div>
      <img
        src='/images/trello2.png'
        alt='trello'
        onClick={() => handleClick({ name: 'boards' })}
        data-testid='navBarHomeLink'
      ></img>
      <div className='navbar-right'>
        <div className='navbar-left-search'>
          <IoAdd />
        </div>
        <div className='navbar-left-search'>
          <BsInfoCircle />
        </div>
        <div className='navbar-left-search-bell'>
          <AiOutlineBell />
        </div>
      </div>
    </nav>
  )
}
NavBar.propTypes = {
  currentSearch: PropTypes.string,
  setCurrentSearch: PropTypes.func,
}
export default NavBar
