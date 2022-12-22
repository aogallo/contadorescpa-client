import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const CustomDatePicker = ({
  touch,
  errors,
  label,
  name,
  value,
  state,
  changeDate
}) => {
  const handleChange = (value) => {
    changeDate({
      ...state,
      [name]: value
    })
  }

  return (
    <div className='form__control'>
      <label htmlFor={name} className='form__label'>
        {label}
      </label>
      <DatePicker className='form__input'
        selected={value}
        onChange={(date) => handleChange(date)}
        dateFormat='dd/MM/yyyy'
      />
      {
        touch && errors[name] && (
          <p style={{ color: 'red' }}> {errors[name]}</p>
        )
      }
    </div>
  )
}

export default CustomDatePicker
