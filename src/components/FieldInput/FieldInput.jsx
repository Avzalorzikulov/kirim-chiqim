import React, { useState } from 'react'
import './FieldInput.css';
const FieldInput = (props) => {
  const {id , error, label,  ...inputValues} = props

  const [focused, setFocused] = useState(false);

  return (
    <div> 
      <label htmlFor={inputValues.name} className='block text-left text-sm font-medium text-gray-700'>{label}</label>

        <input id={inputValues.name} focused={focused.toString()} 
        onFocus={(evt)=> inputValues.name == 'confirmPassword' && setFocused(true)}
        onBlur={(evt)=> setFocused(true)} {...inputValues}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />

        <p className='text-red-500 hidden'>{error}</p>
    </div>
  )
}

export default FieldInput