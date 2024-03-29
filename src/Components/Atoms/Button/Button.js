import React from 'react'

function Button({buttonText, onClick}) {
  return (
    <div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  )
}

export default Button