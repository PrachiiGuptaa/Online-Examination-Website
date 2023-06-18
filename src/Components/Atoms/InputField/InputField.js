import React from 'react'

function InputField({type, value, placeholder, onChange, onFocus, onBlur}) {
  return (
    <div>
      <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      />
    </div>
  )
}

export default InputField
