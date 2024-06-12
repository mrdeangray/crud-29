import React from 'react'
import BackIcon from './BackIcon'
import "./back-btn-styles.css"

const BackBtn = () => {
  return (
    <div className='back-btn'>
        <button>
            <BackIcon />
        </button>
    </div>
  )
}

export default BackBtn