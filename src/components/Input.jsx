import React from 'react'

const Input = ({placeholder, value, onChange}) => {
  return (
    <div>
        <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default Input