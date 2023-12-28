import React from 'react'

const Header = ({ title }) => {
  return (
    <header className='d-flex header align-items-center'>
        <div className='container'>
          <h1 className='header-title text-center'>{title}</h1>
        </div>
    </header>
  )
}

export default Header