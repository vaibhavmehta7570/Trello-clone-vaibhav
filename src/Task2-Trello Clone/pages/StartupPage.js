import React from 'react'
import { Link } from 'react-router-dom'
import { MdNavigateNext } from 'react-icons/md'
import './StartupPage.css'

export default function StartupPage() {
  return (
    <div className='landing-page-container'>
      <div className='landing-page'>
        <div className='landing-left'>
          <img src='/trello startuppage.png' alt='trello-clone' />
        </div>

        <div className='landing-right'>
          <Link to='/boards'>
            <div>
              <span>Boards</span> <MdNavigateNext />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
